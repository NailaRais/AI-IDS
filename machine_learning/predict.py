import numpy as np
import tensorflow as tf

model = tf.keras.models.load_model('intrusion_model.h5')

def predict(data):
    processed_data = preprocess(data)  # Add your preprocessing logic
    prediction = model.predict(np.array(processed_data))
    return prediction
