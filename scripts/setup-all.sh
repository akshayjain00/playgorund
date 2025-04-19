#!/bin/bash
echo "Setting up all projects in monorepo..."

# Install root dependencies
pip install -r requirements.txt

# Traverse into each app and set up
for app in apps/*/; do
  if [ -f "${app}requirements.txt" ]; then
    echo "Setting up ${app}..."
    (cd "${app}" && pip install -r requirements.txt)
  fi
done

# Traverse into each package and set up
for pkg in packages/*/; do
  if [ -f "${pkg}requirements.txt" ]; then
    echo "Setting up ${pkg}..."
    (cd "${pkg}" && pip install -r requirements.txt)
  fi
done

echo "Setup complete!"
