module.exports = {
    getCampgrounds: (req, res) => {
        const db = req.app.get('db');
        db.campsites.get_campgrounds()
        .then(campgrounds => res.status(200).send(campgrounds))
        .catch(err => res.status(500).send(err));
    },

    getCampground: async (req, res) => {
        const {campground_id} = req.params
        const campground = await req.app.get('db').campsites.get_campground(campground_id)
        return res.status(200).send(campground)
    },

    searchCampground: async (req, res) => {
        const {search} = req.query
        const campground = await req.app.get('db').search.search_campgrounds(search)
        return res.status(200).send(campground)
    }
}