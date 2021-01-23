const fetch = require('node-fetch');

module.exports = class CloudflarePageRules {

    constructor (token, zoneScope = null) {
        this.token = token;
        this.zoneScope = zoneScope;

        this.baseURL = 'https://api.cloudflare.com/client/v4/';
    }

    request (endpoint, method = 'GET', body) {
        return new Promise((resolve) => {
            if (body) body = JSON.stringify(body);
            fetch(`${this.baseURL}${endpoint}`, {
                body,
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.token}`
                }
            }).then((res) => {
                res.json().then((data) => resolve(data));
            })
        })
    }

    list (zoneScope) {
        if (!zoneScope && !this.zoneScope) throw new Error('Missing zone ID');
        return this.request(`zones/${zoneScope || this.zoneScope}/pagerules`);
    }

    create (pageRuleOptions, zoneScope) {
        if (!zoneScope && !this.zoneScope) throw new Error('Missing zone ID');
        if (!pageRuleOptions) throw new Error('Missing Page Rule Object');
        return this.request(`zones/${zoneScope || this.zoneScope}/pagerules`, 'POST', pageRuleOptions);
    }

    details (pageRuleID, zoneScope) {
        if (!zoneScope && !this.zoneScope) throw new Error('Missing zone ID');
        if (!pageRuleID) throw new Error('Missing Page Rule ID');
        return this.request(`zones/${zoneScope || this.zoneScope}/pagerules/${pageRuleID}`);
    }

    update (pageRuleID, pageRuleOptions, zoneScope) {
        if (!zoneScope && !this.zoneScope) throw new Error('Missing zone ID');
        if (!pageRuleID) throw new Error('Missing Page Rule ID');
        if (!pageRuleOptions) throw new Error('Missing Page Rule Object');
        return this.request(`zones/${zoneScope || this.zoneScope}/pagerules/${pageRuleID}`, 'PUT', pageRuleOptions);
    }

    edit (pageRuleID, pageRuleOptions, zoneScope) {
        if (!zoneScope && !this.zoneScope) throw new Error('Missing zone ID');
        if (!pageRuleID) throw new Error('Missing Page Rule ID');
        if (!pageRuleOptions) throw new Error('Missing Page Rule Object');
        return this.request(`zones/${zoneScope || this.zoneScope}/pagerules/${pageRuleID}`, 'PATCH', pageRuleOptions);
    }

    delete (pageRuleID, pageRuleOptions, zoneScope) {
        if (!zoneScope && !this.zoneScope) throw new Error('Missing zone ID');
        if (!pageRuleID) throw new Error('Missing Page Rule ID');
        if (!pageRuleOptions) throw new Error('Missing Page Rule Object');
        return this.request(`zones/${zoneScope || this.zoneScope}/pagerules/${pageRuleID}`, 'DELETE');
    }

};
