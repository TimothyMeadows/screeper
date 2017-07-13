Creep.prototype.hive = {
    workCount: function(id) {
        var name, count = 0;
        for (name in Game.creeps) {
            if (Game.creeps.hasOwnProperty(name)) {
                var creep = Game.creeps[name];
                if (creep.memory.work) {
                    if (creep.memory.work.target === id) {
                        count++;
                    }
                }
            }
        }

        return count;
    }
}