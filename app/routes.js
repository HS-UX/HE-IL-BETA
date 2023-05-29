//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const differenceBetween = (firstString, secondString) => firstString.split(secondString).join('')
// Add your routes here
router.post('/yes-no-confirmation', (req, res) => {
    const url = req.headers.referrer || req.headers.referer; 
    const origin = `${req.headers.origin}/`;

    const pageName = differenceBetween(url, origin) 
    const choice = req.session.data[pageName]
    
    if(choice === 'yes')
        res.redirect(req.session.data['yes-route'])
    else
        res.redirect(req.session.data['no-route'])
})

router.post('/housetypes/house-type-a-summary-answer', (req, res) => {
    const addNewHouseType = req.session.data['do-you-want-to-add-another-house-type'];
    if (addNewHouseType == "Yes, add another house type") {
        res.redirect('/housetypes/add-another-house-type')
    }
    else {
        res.redirect('../cashflow/cashflow-start')
    }
})

router.post('/housetypes/add-another-house-type-answer', (req, res) => {
    const AddHouserType = req.session.data['how-would-you-like-to-add-another-house-type'];
    if (AddHouserType == "I would like to create a new house type") {
        res.redirect('/housetypes/type-b/what-tenure-is-this-house-type')
    }
    else {
        res.redirect('/housetypes/house-types-copy-from-a-type')
    }
})

router.get('/tmp', (req, res) => {
    console.log(JSON.stringify(req.session.data))
})