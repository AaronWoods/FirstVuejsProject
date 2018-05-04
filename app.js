new Vue({
    el: "#app",
    data: {
        startGame: false,
        playerHealth: 100,
        monsterHealth: 100,
        change: 0,
        battleLog: [],
        difficulty : 0,
        difficultySelection: false,
        gameRunning: false
    },
    computed: {
    },
    methods: {
        attack : function(target){
            var dmg = this.randomNumber();
            return target - dmg < 0 ? -1 : dmg;                
        },
        playerAttack : function(){
            var playerDamage = this.attack(this.monsterHealth);
            this.monsterHealth = playerDamage == -1 ? 0 : this.monsterHealth - playerDamage;
            //playerDamage == -1 ? this.battleLog.unshift({message:"Monster Dead", player: "player"}) : this.battleLog.unshift({message: "Player did " + playerDamage + "to Monster", player:"player"});
            this.log("player","monster", playerDamage);
            if(this.monsterHealth == 0){
                this.gameOver("Player");
            }else{
                this.monsterAttack();
            }
        },
        log : function(attacker,defender,playerDamage){
                playerDamage == -1 ? this.battleLog.unshift({message: defender + " is Dead", player: attacker }) : this.battleLog.unshift({message: attacker + " did " + playerDamage + "to " + defender , player:attacker});
        },
        monsterAttack : function(){
            var monsterDamage = this.attack(this.playerHealth);
            this.playerHealth = monsterDamage == -1 ? 0 : this.playerHealth - (monsterDamage + this.difficulty);
            //monsterDamage == -1 ? this.battleLog.unshift({message:"Player Dead", player: "monster"}) : this.battleLog.unshift({message:"Monster did " + monsterDamage + "to Player", player:"monster"});
            this.log("monster","player", (monsterDamage + this.difficulty));
            if(this.playerHealth == 0){
                this.gameOver("Monster");
            }
        },
        specialAttack: function(){
            this.monsterHealth - 10 <= 0 ? this.monsterHealth = 0 : this.monsterHealth -=10;
            this.battleLog.unshift({message:"Player used a special attack", player: "player"});
            if(this.monsterHealth == 0){
                this.gameOver("Players");
            }else{
                this.monsterAttack();
            }
        },
        heal : function(){
            this.playerHealth + 10 >= 100 ? this.playerHealth = 100 : this.playerHealth += 10;
            this.battleLog.unshift({message:"Player healed", player: "player"});
            this.monsterAttack();
        },
        randomNumber : function(){
            return Math.floor(Math.random()*10);
        },
        giveUp : function(){
            this.startGame = false;
            this.gameRunning = false
        },
        gameOver : function(winner){
            if(confirm(winner + " has won! Do you want to continue")){
                this.initialize();
            }else{
                this.startGame = false;
                this.gameRunning = false;
            } 
        },
        initialize : function(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.battleLog = [];
            this.gameRunning = true;
        }
    },
});