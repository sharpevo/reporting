module.exports = {
    genes_nccn: async (inspectionProject, args, { models }) => {
        const geneds = await models.Gene.find({
            _id: { $in: inspectionProject.genes_nccn },
        });
        var newGenes = [];
        inspectionProject.genes_nccn.forEach((gene) => {
            var found = geneds.find((gened) => gened._id.equals(gene));
            if (found) {
                newGenes.push(found);
            } else {
                console.log("not found", gene);
            }
        });
        return newGenes;
    },
    genes_panel: async (inspectionProject, args, { models }) => {
        const geneds = await models.Gene.find({
            _id: { $in: inspectionProject.genes_panel },
        });
        var newGenes = [];
        inspectionProject.genes_panel.forEach((gene) => {
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
