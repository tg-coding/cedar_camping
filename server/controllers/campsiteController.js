module.exports = {
    getCampsites: (req, res) => {
        const db = req.app.get('db');
        db.campsites.get_campsites()
        .then(campsites => res.status(200).send(campsites))
        .catch(err => res.status(500).send(err));
    },
    // getCampsitesAll: (req, res) => {
    //     const db = req.app.get('db');
    //     db.campsites.get_campsites_all()
    //     .then(campsites => res.status(200).send(campsites))
    //     .catch(err => res.status(500).send(err));
    // },
    getCampsite: async (req, res) => {
        const {campsite_id} = req.params
        const campsite = await req.app.get('db').get_campsite(campsite_id)
        return res.status(200).send(campsite)
    }
    
}