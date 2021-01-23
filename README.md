# Cloudflare Page Rules

Update Cloudflare **Page Rules** (only pages rules) dynamically. This package was created because I couldn't find a package that works. **[cloudflare](https://www.npmjs.com/package/cloudflare)** shown deprecation messages in the console, and the other packages only support DNS calls (I needed page rules API).

## Installation

```sh
yarn add cloudflare-page-rules
```

## Example

```js
const CloudflarePageRules = require('cloudflare-page-rules');
const cloudflare = new CloudflarePageRules('token');

cloudflare.list('zone ID');
cloudflare.details('zone ID', 'page rule ID');
cloudflare.delete('zone ID', 'page rule ID');
cloudflare.update('zone ID', 'page rule ID', {
    targets: [],
    actions: []
});
cloudflare.edit('zone ID', 'page rule ID', {
    targets: [],
    actions: []
});
cloudflare.create('zone ID', {
    targets: [],
    actions: []
});
```
