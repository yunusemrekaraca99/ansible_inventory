FROM python:3.9-alpine

WORKDIR /app

# Install system dependencies
RUN apk add --no-cache pkgconf cairo-dev build-base

# Update pip
RUN pip install --no-cache-dir --upgrade pip

# Set up a virtual environment
RUN python -m venv venv
ENV PATH="/app/venv/bin:$PATH"

COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "app.py"]

