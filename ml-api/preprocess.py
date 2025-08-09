import re 
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from tensorflow.keras.preprocessing.sequence import pad_sequences

lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def preprocess(text):
    text = re.sub('[^a-zA-Z0-9]',' ',text)
    text = text.lower().split()
    text = [lemmatizer.lemmatize(word) for word in text if word not in stop_words]
    return ' '.join(text)

def vectorize(text, tokenizer, max_len = 250):
    seq = tokenizer.texts_to_sequences([text])
    padded = pad_sequences(seq, maxlen = max_len)
    return padded

