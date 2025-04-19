#!/usr/bin/env python
"""LLM Explorer Application."""

import sys
import os

# Add the repository root to the Python path to import packages
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../..')))

from packages.ai-utils.ai_utils import get_version

def main():
    """Run the LLM Explorer application."""
    print(f"LLM Explorer v{get_version()}")
    print("Ready to explore LLM capabilities!")

if __name__ == "__main__":
    main()
