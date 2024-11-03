import pandas as pd
from model import build_model

# Load and preprocess data
data = pd.read_csv('data.csv')  # Replace with your dataset
X = data.drop('label', axis=1)
y = data['label']

# Train the model
model = build_model()
model.fit(X, y, epochs=10, batch_size=32)

# Save the model
model.save('intrusion_model.h5')
