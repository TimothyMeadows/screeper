var Debug;
module.exports = Debug = {
    log: function(value) {
        // TODO: Log into memory until reaches N number, then send notice through screeps API.
        console.log(`${value}, time: ${Game.time}`);
    },
    errorNumberToString: function (value) {
        switch (value) {
            case ERR_NOT_OWNER:
                return "ERROR_NOT_OWNER";
            case ERR_NO_PATH:
                return "ERROR_NO_PATH";
            case ERR_NAME_EXISTS:
                return "ERROR_NAME_EXISTS";
            case ERR_BUSY:
                return "ERROR_BUSY";
            case ERR_NOT_FOUND:
                return "ERROR_NOT_FOUND";
            case ERR_NOT_ENOUGH_ENERGY:
                return "ERROR_NOT_ENOUGH_ENERGY";
            case ERR_NOT_ENOUGH_RESOURCES:
                return "ERROR_NOT_ENOUGH_RESOURCES";
            case ERR_NOT_ENOUGH_EXTENSIONS:
                return "ERROR_NOT_ENOUGH_EXTENSIONS";
            case ERR_INVALID_TARGET:
                return "ERROR_INVALID_TARGET";
            case ERR_FULL:
                return "ERROR_FULL";
            case ERR_NOT_IN_RANGE:
                return "ERROR_NOT_IN_RANGE";
            case ERR_INVALID_ARGS:
                return "ERROR_INVALID_ARGS";
            case ERR_TIRED:
                return "ERROR_TIRED";
            case ERR_NO_BODYPART:
                return "ERROR_NO_BODYPART";
            case ERR_RCL_NOT_ENOUGH:
                return "ERROR_RCL_NOT_ENOUGH";
            case ERR_GCL_NOT_ENOUGH:
                return "ERROR_GCL_NOT_ENOUGH";
            default:
                return `UNKNOWN: ${value}`;
    
        }
    }
};