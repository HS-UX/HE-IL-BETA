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

router.get('/tmp', (req, res) => {
    console.log(JSON.stringify(req.session.data))
})