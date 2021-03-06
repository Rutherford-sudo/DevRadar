const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringArray');


module.exports = {
    async index(request, response){
        // search devs 10km
        const {latitude, longitude, techs} = request.query;
        const techsArray = parseStringAsArray(techs);
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },

            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude,latitude],
                    },

                    $maxDistance: 10000,
                },
            },
        });

        return response.json({devs});
    }
}