import os
import sys
import json
from pathlib import Path

import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score
import joblib


BASE_DIR = Path(__file__).resolve().parent
MODELS_DIR = BASE_DIR / "models"
MODELS_DIR.mkdir(parents=True, exist_ok=True)


def train_heart_model():
    heart_path = BASE_DIR / "datasets" / "heart.csv"
    if not heart_path.exists():
        print(f"Error: heart.csv not found at {heart_path}. Please place the file at backend/ml/datasets/heart.csv.")
        sys.exit(1)

    df = pd.read_csv(heart_path)
    df = df.replace('?', np.nan).dropna()

    if 'num' in df.columns:
        y = (df['num'] > 0).astype(int)
        X = df.drop(columns=['num'])
    elif 'target' in df.columns:
        y = df['target']
        X = df.drop(columns=['target'])
    elif 'HeartDisease' in df.columns:
        y = df['HeartDisease']
        X = df.drop(columns=['HeartDisease'])
    else:
        y = df.iloc[:, -1]
        X = df.iloc[:, :-1]

    X = pd.get_dummies(X, drop_first=True)

    X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)

    clf = make_pipeline(StandardScaler(), LogisticRegression(max_iter=3000))
    clf.fit(X_train, y_train)

    preds = clf.predict(X_test)
    probs = clf.predict_proba(X_test)[:, 1]

    acc = accuracy_score(y_test, preds)
    prec = precision_score(y_test, preds, zero_division=0)
    rec = recall_score(y_test, preds, zero_division=0)
    f1 = f1_score(y_test, preds, zero_division=0)

    print("Heart Disease Model Metrics:")
    print(f"Accuracy: {acc:.4f}")
    print(f"Precision: {prec:.4f}")
    print(f"Recall: {rec:.4f}")
    print(f"F1 Score: {f1:.4f}")

    joblib.dump(clf, MODELS_DIR / 'heart_model.pkl')
    print(f"Saved heart model to {MODELS_DIR / 'heart_model.pkl'}")

    return {'accuracy': acc, 'precision': prec, 'recall': rec, 'f1': f1}


def train_diabetes_model():
    pima_url = "https://raw.githubusercontent.com/plotly/datasets/master/diabetes.csv"
    df = pd.read_csv(pima_url)

    df = df.replace('?', np.nan).dropna()

    # Identify target
    if 'Outcome' in df.columns:
        y = df['Outcome']
        X = df.drop(columns=['Outcome'])
    elif 'target' in df.columns:
        y = df['target']
        X = df.drop(columns=['target'])
    else:
        y = df.iloc[:, -1]
        X = df.iloc[:, :-1]

    X = pd.get_dummies(X, drop_first=True)

    X_train, X_test, y_train, y_test = train_test_split(X, y, stratify=y, test_size=0.2, random_state=42)

    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)

    preds = clf.predict(X_test)

    acc = accuracy_score(y_test, preds)
    prec = precision_score(y_test, preds, zero_division=0)
    rec = recall_score(y_test, preds, zero_division=0)
    f1 = f1_score(y_test, preds, zero_division=0)

    print("Diabetes Model Metrics:")
    print(f"Accuracy: {acc:.4f}")
    print(f"Precision: {prec:.4f}")
    print(f"Recall: {rec:.4f}")
    print(f"F1 Score: {f1:.4f}")

    joblib.dump(clf, MODELS_DIR / 'diabetes_model.pkl')
    print(f"Saved diabetes model to {MODELS_DIR / 'diabetes_model.pkl'}")

    return {'accuracy': acc, 'precision': prec, 'recall': rec, 'f1': f1}


def main():
    print("Training heart disease model...")
    heart_metrics = train_heart_model()

    print("\nTraining diabetes model...")
    diabetes_metrics = train_diabetes_model()

    results = {'heart': heart_metrics, 'diabetes': diabetes_metrics}
    print("\nTraining complete. Summary:")
    print(json.dumps(results, indent=2))


if __name__ == '__main__':
    main()
