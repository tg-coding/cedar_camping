module.exports = {
    getCampgrounds: (req, res) => {
        const db = req.app.get('db');
        db.campsites.get_campgrounds()
        .then(campgrounds => res.status(200).send(campgrounds))
        .catch(err => res.status(500).send(err));
    },

    searchCampgrounds: async (req, res) => {
        const {search} = req.query
        const {campground_id} = req.params
        if(search){
            const campgrounds = await req.app.get('db').search.search_campgrounds(search, campground_id)
            return res.status(200).send(campgrounds)
        } else if (!search){
            const campgrounds = await req.app.get('db').campsites.get_campgrounds()
            return res.status(200).send(campgrounds)
        }
    },

    getCampground: async (req, res) => {
        const {campground_id} = req.params
        const campground = await req.app.get('db').campsites.get_campground(campground_id)
        return res.status(200).send(campground)
    },

    // searchCampgrounds: async (req, res) => {
    //     const {search} = req.query
    //     const campground = await req.app.get('db').search.search_campgrounds(search)
    //     return res.status(200).send(campground)
    // }
}