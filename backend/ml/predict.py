import argparse
import json
import sys
import traceback
from pathlib import Path

import joblib
import pandas as pd


MODELS_DIR = Path(__file__).resolve().parent / 'models'
HEART_MODEL_PATH = MODELS_DIR / 'heart_model.pkl'
DIABETES_MODEL_PATH = MODELS_DIR / 'diabetes_model.pkl'

if not HEART_MODEL_PATH.exists() or not DIABETES_MODEL_PATH.exists():
    raise FileNotFoundError(f"Missing model files in {MODELS_DIR}")

HEART_MODEL = joblib.load(HEART_MODEL_PATH)
DIABETES_MODEL = joblib.load(DIABETES_MODEL_PATH)


def _risk_level(percentage: float):
    p = max(0.0, min(100.0, percentage))
    if p <= 25:
        return 'Very Low'
    if p <= 50:
        return 'Low'
    if p <= 75:
        return 'Moderate'
    return 'High'


def _numeric_value(value, default=0.0):
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _parse_age(value):
    mapping = {
        'age_under_30': 28,
        'age_30_40': 35,
        'age_40_50': 45,
        'age_above_50': 60,
    }
    return mapping.get(value, 50)


def _parse_gender(value):
    return str(value).lower() == 'gender_male'


def _parse_smoke(value):
    return str(value).lower() == 'smoke_frequent'


def _parse_activity(value):
    mapping = {
        'activity_low': 0,
        'activity_moderate': 1,
        'activity_high': 2,
    }
    return mapping.get(value, 1)


def _parse_family(value):
    return str(value).lower() == 'family_diabetes_yes' or str(value).lower() == 'family_heart_yes'


def _build_heart_features(data):
    age = _parse_age(data.get('age'))
    smoke = _parse_smoke(data.get('smoke'))
    family_heart = str(data.get('family_heart')).lower() == 'family_heart_yes'
    trestbps = 130 + (5 if smoke else 0)
    chol = 210 + (10 if smoke else 0)
    thalach = 150 + (5 if _parse_activity(data.get('activity')) == 2 else 0)
    oldpeak = 1.0 if smoke else 0.6
    ca = 0
    cp_atypical_angina = 1 if family_heart else 0
    cp_non_anginal = 1 if not family_heart else 0
    cp_typical_angina = 0
    fbs_true = 1 if str(data.get('family_diabetes')).lower() == 'family_diabetes_yes' else 0
    exang_true = 1 if smoke else 0
    slope_flat = 0
    slope_upsloping = 1
    thal_normal = 1
    thal_reversable_defect = 0

    return {
        'id': 0,
        'age': age,
        'trestbps': trestbps,
        'chol': chol,
        'thalch': float(thalach),
        'oldpeak': oldpeak,
        'ca': ca,
        'sex_Male': 1 if _parse_gender(data.get('gender')) else 0,
        'dataset_Hungary': 0,
        'dataset_VA Long Beach': 0,
        'cp_atypical angina': cp_atypical_angina,
        'cp_non-anginal': cp_non_anginal,
        'cp_typical angina': cp_typical_angina,
        'fbs_True': fbs_true,
        'restecg_normal': 1,
        'restecg_st-t abnormality': 0,
        'exang_True': exang_true,
        'slope_flat': slope_flat,
        'slope_upsloping': slope_upsloping,
        'thal_normal': thal_normal,
        'thal_reversable defect': thal_reversable_defect,
    }


def _build_diabetes_features(data):
    age = _parse_age(data.get('age'))
    gender = _parse_gender(data.get('gender'))
    height_cm = _numeric_value(data.get('height'), 170)
    weight_kg = _numeric_value(data.get('weight'), 70)
    bmi = weight_kg / ((height_cm / 100) ** 2) if height_cm > 0 else 27.0
    pregnancies = 0 if gender else 1
    glucose = 100 + (10 if str(data.get('family_diabetes')).lower() == 'family_diabetes_yes' else 0)
    blood_pressure = 75
    skin_thickness = 20
    insulin = 80
    dpf = 0.8 if str(data.get('family_diabetes')).lower() == 'family_diabetes_yes' else 0.2

    return {
        'Pregnancies': pregnancies,
        'Glucose': glucose,
        'BloodPressure': blood_pressure,
        'SkinThickness': skin_thickness,
        'Insulin': insulin,
        'BMI': bmi,
        'DiabetesPedigreeFunction': dpf,
        'Age': age,
    }


def predict_heart(data):
    features = _build_heart_features(data)

    try:
        # Get feature names from the scaler inside the pipeline
        feature_names = HEART_MODEL.named_steps["standardscaler"].feature_names_in_

        # Create dataframe
        df = pd.DataFrame([features])

        # Add any missing columns
        for col in feature_names:
            if col not in df.columns:
                df[col] = 0

        # Keep exact order
        df = df[list(feature_names)]

        proba = HEART_MODEL.predict_proba(df)[0][1]

    except Exception:
        print("\n====== HEART MODEL ERROR ======", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)

        print("\nExpected Columns:", file=sys.stderr)
        print(feature_names, file=sys.stderr)

        print("\nProvided Columns:", file=sys.stderr)
        print(df.columns.tolist(), file=sys.stderr)

        print("\nFeature Values:", file=sys.stderr)
        print(df.to_dict(), file=sys.stderr)

        raise

    percentage = float(proba) * 100

    return {
        "riskPercentage": round(percentage, 2),
        "riskLevel": _risk_level(percentage),
    }


def predict_diabetes(data):
    features = _build_diabetes_features(data)

    try:
        feature_names = DIABETES_MODEL.feature_names_in_

        df = pd.DataFrame([features])

        for col in feature_names:
            if col not in df.columns:
                df[col] = 0

        df = df[list(feature_names)]

        proba = DIABETES_MODEL.predict_proba(df)[0][1]

    except Exception:
        print("\n====== DIABETES MODEL ERROR ======", file=sys.stderr)
        traceback.print_exc(file=sys.stderr)
        raise

    percentage = float(proba) * 100

    return {
        "riskPercentage": round(percentage, 2),
        "riskLevel": _risk_level(percentage),
    }


def run_server():
    for raw_line in sys.stdin:
        try:
            payload = json.loads(raw_line)
            command = payload.get('command')
            data = payload.get('data', {})
            request_id = payload.get('id')
            if command == 'heart':
                result = predict_heart(data)
            elif command == 'diabetes':
                result = predict_diabetes(data)
            else:
                raise ValueError(f"Unknown command: {command}")

            response = {'id': request_id, 'result': result}
        except Exception as exc:
            response = {'id': payload.get('id') if isinstance(payload, dict) else None, 'error': str(exc)}
        sys.stdout.write(json.dumps(response) + '\n')
        sys.stdout.flush()


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--server', action='store_true', help='Run prediction server')
    args = parser.parse_args()
    if args.server:
        run_server()
    else:
        print('This module provides predict_heart and predict_diabetes functions.')
