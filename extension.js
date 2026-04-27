module.exports = {
    name: 'RegistrationCountCard',
    publisher: 'Sample',
    cards: [{
        type: 'RegistrationCountCardCard',
        source: './src/cards/RegistrationCountCardCard',
        title: 'Registration Count',
        displayCardType: 'Registration Count Card',
        description: 'Displays the number of active registrations for a configured term.',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        },
        configuration: {
            client: [
                {
                    key: 'termCode',
                    label: 'Term Code (YYYYSS)',
                    type: 'text',
                    required: true
                },
                {
                    key: 'termLabel',
                    label: 'Term Label (optional display override)',
                    type: 'text',
                    required: false
                }
            ]
        },
    }],
    page: {
        source: './src/page/router.jsx'
    }
};