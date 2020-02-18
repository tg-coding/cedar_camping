module.exports = {
    getCampsites: async (req, res) => {
        const {search} = req.query
        const {id} = req.params;
        if(search){
            const campsites = await req.app.get('db').search.search_campsites(search, id)
            return res.status(200).send(campsites)
        } else if (!search){
            const campsites = await req.app.get('db').campsites.get_campsites(id)
            return res.status(200).send(campsites)
        }
    },

    // getCampsites: (req, res) => {
    //     const {id} = req.params;
    //     console.log(req.params)
    //     const db = req.app.get('db');
    //     db.campsites.get_campsites(id)
    //     .then(campsites => res.status(200).send(campsites))
    //     .catch(err => res.status(500).send(err));
    // },

    getCampsite: async (req, res) => {
        
        const {id} = req.params
        const campsite = await req.app.get('db').campsites.get_campsite(id)
        // console.log(campsite)
        return res.status(200).send(campsite)
    },

    searchCampsites: async (req, res) => {
        const {search} = req.query
        const campsites = await req.app.get('db').search_campsites(search)
        return res.status(200).send(campsites)
    }
}