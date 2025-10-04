#!/usr/bin/env python3
"""
Simple HTTP server to serve the Ultravox test page.
This resolves CORS issues when running from file:// protocol.
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configuration
PORT = 8000
DIRECTORY = Path(__file__).parent

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """HTTP Request Handler with CORS headers"""

    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        # Handle preflight requests
        self.send_response(200)
        self.end_headers()

def main():
    # Change to the directory containing the HTML files
    os.chdir(DIRECTORY)

    # Create server
    with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
        print(f"Starting server at http://localhost:{PORT}")
        print(f"Serving files from: {DIRECTORY}")
        print("\nAvailable pages:")
        print(f"  - Simple test: http://localhost:{PORT}/ultravox-test-simple.html")
        print(f"  - Full test: http://localhost:{PORT}/ultravox-test.html")
        print("\nPress Ctrl+C to stop the server")

        # Try to open browser automatically
        try:
            webbrowser.open(f'http://localhost:{PORT}/ultravox-test-simple.html')
            print("Opening browser automatically...")
        except:
            print("Could not open browser automatically. Please open the URL manually.")

        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    main()