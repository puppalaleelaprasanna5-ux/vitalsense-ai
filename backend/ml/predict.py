import joblib
from pathlib import Path

MODELS_DIR = Path(__file__).resolve().parent / 'models'


def _risk_level(percentage: float):
    p = max(0.0, min(100.0, percentage))
    if p <= 25:
        return 'Very Low'
    if p <= 50:
        return 'Low'
    if p <= 75:
        return 'Moderate'
    return 'High'


def predict_heart(features):
    model_path = MODELS_DIR / 'heart_model.pkl'
    clf = joblib.load(model_path)
    # features should be array-like of shape (n_features,) or 2D
    proba = clf.predict_proba([features])[0][1] if hasattr(clf, 'predict_proba') else clf.predict([features])[0]
    percentage = float(proba) * 100.0
    return {'risk_percentage': percentage, 'risk_level': _risk_level(percentage)}


def predict_diabetes(features):
    model_path = MODELS_DIR / 'diabetes_model.pkl'
    clf = joblib.load(model_path)
    proba = clf.predict_proba([features])[0][1] if hasattr(clf, 'predict_proba') else clf.predict([features])[0]
    percentage = float(proba) * 100.0
    return {'risk_percentage': percentage, 'risk_level': _risk_level(percentage)}


if __name__ == '__main__':
    print('This module provides predict_heart and predict_diabetes functions.')
