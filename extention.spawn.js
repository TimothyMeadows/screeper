// ReSharper disable UseOfImplicitGlobalInFunctionScope
// ReSharper disable PossiblyUnassignedProperty
var Brain = require("brain");

Spawn.prototype.spawnCaste = function (casteName, role, background) {
    var caste = require("caste." + casteName);
    /**
     * @type {StructureSpawn}
     */
    var spawn = this;
    
    var name = `${caste.name}-${Math.floor((Math.random() * 1000) + 1).toString(16)}`;
    if (background)
        caste.background = background;

    var upgrade = Brain.upgrade(spawn, caste);
    name += `x${upgrade.level + 1}`;
    switch (spawn.createCreep(upgrade.parts, name, { caste: caste, role: role ? role : caste.role })) {
        case OK:
            spawn.room.log(`spawned ${name}, caste: ${caste.name}, role: ${role ? role : caste.role}`);
            break;
        default:
            spawn.room.log(`validation failed for creating ${name}, parts: ${upgrade.parts}, role: ${role ? role : caste.role},  energyAvailable: ${spawn.room.energyAvailable}, cost: ${upgrade.cost}, level: ${upgrade.level} reason: ${spawn.room.errorCodeToName(spawn.canCreateCreep(upgrade.parts, name, { caste: caste, role: role ? role : caste.role }))}`);
            break;
    }    
}