module.exports = {
    genes: async (inspectionProject, args, { models }) => {
        const geneds = await models.Gene.find({
            _id: { $in: inspectionProject.genes },
        });
        var newGenes = [];
        inspectionProject.genes.forEach((gene) => {
            var found = geneds.find((gened) => gened._id.equals(gene));
            if (found) {
                newGenes.push(found);
            } else {
                console.log("not found", gene);
            }
        });
        return newGenes;
    },
};
