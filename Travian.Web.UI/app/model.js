function Player() {
    this.uid = "";
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
    this.id = 0;
    this.population = 0;
    this.x = 0;
    this.y = 0;
}

function Alliance() {
    this.name = "";
    this.aid = 0;
    this.players = [];
    this.database = "";
    this.server = "";
}