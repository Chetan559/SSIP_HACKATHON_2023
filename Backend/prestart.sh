#!/bin/bash
echo "Running prestart script to download NLTK data..."
python -c "import nltk; nltk.download('punkt')"
echo "NLTK data downloaded successfully."
