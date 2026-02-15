#!/bin/bash

# --- CONFIGURATION ---
GH_USER="ales17" 
IMAGE_NAME="vylety-web"
PLATFORMS="linux/arm64"
REGISTRY="ghcr.io"
FULL_NAME="$REGISTRY/$GH_USER/$IMAGE_NAME:latest"

echo "----------------------------------------------------"
echo "🚀 Starting Deployment Process for $IMAGE_NAME"
echo "----------------------------------------------------"

# 1. Ensure Docker Buildx is ready
echo "🛠️  Checking Docker Buildx setup..."
# Create a new builder if it doesn't exist
docker buildx create --name multi-arch-builder --use 2>/dev/null || docker buildx use multi-arch-builder
docker buildx inspect --bootstrap

# 2. Build and Push
# Note: Multi-arch builds MUST be pushed directly to a registry
echo "🏗️  Building for platforms: $PLATFORMS"
echo "📦 Target: $FULL_NAME"

docker buildx build \
  --platform $PLATFORMS \
  -t $FULL_NAME \
  --push \
  .

# 3. Final Check
if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS: Image successfully built and pushed to GHCR."
else
    echo ""
    echo "❌ ERROR: Build failed. Check the logs above."
    exit 1
fi