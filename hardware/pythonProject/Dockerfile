# Step 1: Use an official Python runtime as the base image
FROM python:3.11-slim

# Step 2: Set environment variables to prevent Python from writing pyc files and to buffer outputs
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Step 3: Set the working directory inside the container
WORKDIR /app

# Step 4: Install dependencies
# Copy the requirements file first to leverage Docker's cache
COPY requirements.txt /app/

# Install system dependencies (e.g., for PostgreSQL, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && pip install --no-cache-dir -r requirements.txt

# Step 5: Copy the Django project files into the container
COPY . /app/
RUN pip install gunicorn


# Step 6: Set up the entrypoint for the container (optional)
# This could be the command to start Django's development server or Gunicorn
CMD ["gunicorn", "IoT_hub.wsgi:application", "--bind", "0.0.0.0:8000"]

# Expose the port the app runs on
EXPOSE 8000
