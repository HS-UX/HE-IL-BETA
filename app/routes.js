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
        res.redirect('../cashflow/cashflow-form')
    }
})

router.post('/housetypes/add-another-house-type-answer', (req, res) => {
    const addHouseType = req.session.data['how-would-you-like-to-add-another-house-type'];
    if (addHouseType == "I would like to create a new house type") {
        res.redirect('/housetypes/type-b/what-tenure-is-this-house-type')
    }
    else {
        res.redirect('/housetypes/type-a-b/house-type-b-summary')
    }
})


router.post('/revenue/revenue-sources-of-income-answer', (req, res) => {
    const income = req.session.data['income']
    if (income.includes("Commercial")){
        res.redirect("/revenue/revenue-commercial")
    } else if (income.includes("Parking")){
        res.redirect("/revenue/revenue-parking")
    }   else if (income.includes("Rent")){
        res.redirect("/revenue/revenue-rent")
     } else {
        res.redirect("/revenue/revenue-check")
    }
})

router.post('/revenue/revenue-commercial-answer', (req, res) => {
    const income = req.session.data['income']
      if (income.includes("Parking")){
        res.redirect("/revenue/revenue-parking")
    }   else if (income.includes("Rent")){
        res.redirect("/revenue/revenue-rent")
    }  else {
        res.redirect("/revenue/revenue-check")
    }
})

router.post('/revenue/revenue-parking-answer', (req, res) => {
    const income = req.session.data['income']
     if (income.includes("Rent")){
        res.redirect("/revenue/revenue-rent")
    }  else {
        res.redirect("/revenue/revenue-check")
    }
})

router.post('/revenue/revenue-rent-answer', (req, res) => {
    res.redirect("/revenue/revenue-check")
})

router.post('/phase1/phase-1-information-answer', (req, res) => {
    const phase1information = req.session.data['is-this-information-correct'];
    if (phase1information == "Yes, the above information is correct") {
        res.redirect('/phase1/phase-1-house-types')
    }
    else {
        res.redirect('/cashflow/cashflow-intro-5-p1')
    }
})

router.get('/tmp', (req, res) => {
    console.log(JSON.stringify(req.session.data))
})