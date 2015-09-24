function Player() {
    this.uid = "";
    this.aid = '';
    this.name = "";
    this.villages = [];
    this.alliance = "no ally";
    this.rank = 0;
    this.inhabitants = 0;
}
// to make inherited instances get a prop-changed: Player.prototype.myProperty = "inherit";
// => change using: Player.prototype.myProperty = "property changed";

function DefensePlayer(name) {
    //this.base = Player;
    //this.base(name);
    Player.call(this);

    // add properties
}
DefensePlayer.prototype = new Player;

//function OffensivePlayer(name) {
//    Player.call(this, name);    <=>   this.base = Player;
//                                      this.base(name)
//}

function Village() {
    this.name = "noname";
    this.player = '';
    this.alliance = '';
    this.did = 0;
    this.uid = 0;
    this.aid = 0;
    this.inhabitants = 0;
    this.x = 0;
    this.y = 0;
    this.coordinates = '';
    this.speed = 6; // kata speed on normal x3 ?
    this.tournament = 100; // 100%, normal unbuilt
}
Village.prototype = {
    set coordinates(coords) {
        var c = coords.split("|");

        if (c.length === 2) {
            this.x = c[0];
            this.y = c[1];
        }
    }
};


function Alliance() {
    this.name = "";
    this.aid = 0;
    this.players = [];
    this.database = "";
    this.server = "";
}