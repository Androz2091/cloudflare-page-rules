const fetch = require('node-fetch');

module.exports = class CloudflarePageRules {

    constructor (token, zoneScope = null) {
        this.token = token;
        this.zoneScope = zoneScope;

        this.baseURL = 'https://api.cloudflare.com/client/v4/';
    }

    request (endpoint, method = 'GET', body) {
        return new Promise((resolve) => {
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

    create (zoneScope, pageRuleOptions) {
        if (!zoneScope && !this.zoneScope) throw new Error('Missing zone ID');
        if (!pageRuleOptions) throw new Error('Missing Page Rule Object');
        return this.request(`zones/${zoneScope || this.zoneScope}/pagerules`, 'POST', pageRuleOptions);
    }

    details (zoneScope, pageRuleID) {
        if (!zoneScope && !this.zoneScope) throw new Error('Missing zone ID');
        if (!pageRuleID) throw new Error('Missing Page Rule ID');
        return this.request(`zones/${zoneScope || this.zoneScope}/pagerules/${pageRuleID}`);
    }

    update (zoneScope, pageRuleID, pageRuleOptions) {
        if (!zoneScope && !this.zoneScope) throw new Error('Missing zone ID');
        if (!pageRuleID) throw new Error('Missing Page Rule ID');
        if (!pageRuleOptions) throw new Error('Missing Page Rule Object');
        return this.request(`zones/${zoneScope || this.zoneScope}/pagerules/${pageRuleID}`, 'PUT', pageRuleOptions);
    }

    edit (zoneScope, pageRuleID, pageRuleOptions) {
        if (!zoneScope && !this.zoneScope) throw new Error('Missing zone ID');
        if (!pageRuleID) throw new Error('Missing Page Rule ID');
        if (!pageRuleOptions) throw new Error('Missing Page Rule Object');
        return this.request(`zones/${zoneScope || this.zoneScope}/pagerules/${pageRuleID}`, 'PATCH', pageRuleOptions);
    }

    delete (zoneScope, pageRuleID, pageRuleOptions) {
        if (!zoneScope && !this.zoneScope) throw new Error('Missing zone ID');
        if (!pageRuleID) throw new Error('Missing Page Rule ID');
        if (!pageRuleOptions) throw new Error('Missing Page Rule Object');
        return this.request(`zones/${zoneScope || this.zoneScope}/pagerules/${pageRuleID}`, 'DELETE');
    }

};
