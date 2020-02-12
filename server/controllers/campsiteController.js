module.exports = {
    getCampsites: (req, res) => {
        const {campground_id} = req.params;
        const db = req.app.get('db');
        db.campsites.get_campsites(campground_id)
        .then(campsites => res.status(200).send(campsites))
        .catch(err => res.status(500).send(err));
    },

    getCampsite: async (req, res) => {
        const {campsite_id} = req.params
        const campsite = await req.app.get('db').get_campsite(campsite_id)
        return res.status(200).send(campsite)
    },

    searchCampsites: async (req, res) => {
        const {search} = req.query
        const campsites = await req.app.get('db').search_campsites(search)
        return res.status(200).send(campsites)
    }
}