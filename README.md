# Brit's Webhook Proxy

A lightweight Express.js service that forwards HTTP requests to Discord webhooks with rate limiting protection.

## Features

- Simple API endpoint to forward webhook data to Discord
- Built-in rate limiting (10 requests per minute)
- Error handling with consistent response format
- Environment variable configuration

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/brits-webhook-proxy.git
cd brits-webhook-proxy

# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory:

```
PORT=3000
```

## Usage

### Start the server

```bash
npm start
```

### API Endpoint

```
POST /api/webhooks/:webhookId/:webhookToken
```

#### Parameters:
- `webhookId`: Discord webhook ID
- `webhookToken`: Discord webhook token

#### Request Body:
Pass any valid Discord webhook payload in the request body.

#### Example Request:
```javascript
fetch('http://localhost:3000/api/webhooks/123456789/your-webhook-token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content: 'Hello from Brit\'s Webhook Proxy!'
  })
})
```

## Response Format

All responses follow this structure:
```json
{
  "message": "Status message or error details",
  "clientError": boolean,
  "serverError": boolean
}
```

## Rate Limiting

The service limits requests to 10 per minute per IP address.

## License

MIT

## Contributing

Contributions welcome! Please feel free to submit a Pull Request.
