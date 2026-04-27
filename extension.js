module.exports = {
    name: 'RegistrationCountCard',
    publisher: 'Sample',
    cards: [{
        type: 'RegistrationCountCardCard',
        source: './src/cards/RegistrationCountCardCard',
        title: 'RegistrationCountCard Card',
        displayCardType: 'RegistrationCountCard Card',
        description: 'This card displays the total number of registrations for a configured term.',
        configuration: {
            termCode: {
                type: 'string',
                title: 'Term code',
                required: true
            },
            termLabel: {
                type: 'string',
                title: 'Term label (optional)',
                required: false
            }
        },
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};