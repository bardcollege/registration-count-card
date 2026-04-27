module.exports = {
    name: 'RegistrationCountCard',
    publisher: 'Sample',
    cards: [{
        type: 'RegistrationCountCardCard',
        source: './src/cards/RegistrationCountCardCard',
        title: 'RegistrationCountCard Card',
        displayCardType: 'RegistrationCountCard Card',
        description: 'This is an introductory card to the Ellucian Experience SDK',
        pageRoute: {
            route: '/',
            excludeClickSelectors: ['a']
        }
    }],
    page: {
        source: './src/page/router.jsx'
    }
};