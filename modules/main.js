class Joueur {
    #couleur;

    constructor(couleur) {
        this.#couleur = couleur;
    }
}

class Pions {
    #statut;

    constructor() {
        this.#statut = 0;
    }

    getStatut() {
        return this.#statut;
    }

    setStatut(statut) {
        this.#statut = statut;
    }
}

class Grille {
    constructor(element, options = {}) {
        this.element = element;
        this.element.classList.add("divP4");
        this.rows = options.rows;
        this.cols = options.cols;
        this.tab = [];
        for (let i = 0; i < this.rows; i++) {
            this.tab[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.tab[i][j] = new Pions();
            }
        }
    }
}

export class Puissance4 {
    constructor(element, options = {}) {
        this.grille = new Grille(element, options);
        this.joueurActuel = Math.floor(Math.random() * 2);
        this.coup = [];
        this.score = [0, 0];
        this.jeuFini = false;
        this.initJeu();
    }

    initJeu() {
        this.name = document.createElement('h1');
        this.name.innerHTML = "Puissance 4";
        this.name.classList.add('name');
        this.formCouleur = document.createElement('div');
        this.formCouleur.classList.add("formCouleur");
        const labelJ1 = document.createElement('label');
        labelJ1.innerHTML = "Couleur du joueur 1 :"
        this.selectJ1 = document.createElement('select');
        this.selectJ1.classList.add('selectJ1');
        this.selectJ1.onchange = () => {
            document.documentElement.style.setProperty('--J1-couleur', this.selectJ1.value);
        };
        const labelJ2 = document.createElement('label');
        labelJ2.innerHTML = "Couleur du joueur 2 :"
        this.selectJ2 = document.createElement('select');
        this.selectJ2.classList.add('selectJ2');
        this.selectJ2.onchange = () => {
            document.documentElement.style.setProperty('--J2-couleur', this.selectJ2.value);
        };
        const couleurs = [
            {label: "Rouge", value: "#c74848"},
            {label: "Noir", value: "#3b3b3b"},
            {label: "Blanc", value: "#ecececff"},
            {label: "Bleu", value: "#487bc7ff"},
            {label: "Jaune", value: "#ffd500"}
        ];
        const options = couleurs.map(couleur => {
            const option = document.createElement('option');
            option.innerHTML = couleur.label;
            option.value = couleur.value;
            return option;
        });
        options.forEach(option => {
            this.selectJ1.value = couleurs.find(couleur => couleur.label === "Rouge").value;
            this.selectJ1.appendChild(option);
        });
        const options2 = couleurs.map(couleur => {
            const option = document.createElement('option');
            option.innerHTML = couleur.label;
            option.value = couleur.value;
            return option;
        });
        options2.forEach(option => {
            this.selectJ2.value = couleurs.find(couleur => couleur.label === "Noir").value;
            this.selectJ2.appendChild(option);
        });
        const jouer = document.createElement('button');
        jouer.classList.add("jouer");
        jouer.innerHTML = "► Lancer une partie";
        this.grille.element.appendChild(this.name);
        this.formCouleur.appendChild(labelJ1);
        this.formCouleur.appendChild(this.selectJ1);
        this.formCouleur.appendChild(labelJ2);
        this.formCouleur.appendChild(this.selectJ2);
        this.formCouleur.appendChild(jouer);
        this.grille.element.appendChild(this.formCouleur);
        this.joueurs = [new Joueur(this.selectJ1.value), new Joueur(this.selectJ2.value)];
        jouer.onclick = () => {
            if (this.selectJ1.value === this.selectJ2.value) {
                alert('Pour la clarté du jeu, vous ne pouvez pas avoir la même couleur.');
            } else {
                this.initPlateau();
            }
        }
    }

    initPlateau() {
        this.grille.element.innerHTML = "";
        this.name.classList.remove('name');
        this.affichageJoueurActuel = document.createElement('h2');
        this.affichageJoueurActuel.innerHTML = "Au tour du joueur " + (this.joueurActuel + 1);
        this.affichageScore = document.createElement('h2');
        this.affichageScore.classList.add("score")
        this.spanJoueur1 = document.createElement('span');
        this.spanJoueur1.classList.add("scoreJoueur1")
        this.spanJoueur1.textContent = `${this.score[0]}`;
        this.spanJoueur2 = document.createElement('span');
        this.spanJoueur2.classList.add("scoreJoueur2")
        this.spanJoueur2.textContent = `${this.score[1]}`;
        this.tiret = document.createElement('p');
        this.tiret.textContent = " - ";
        const table = document.createElement('table');
        table.classList.add("puissance4");
        const divBtn = document.createElement('div');
        divBtn.classList = "divBtn";
        const rejouer = document.createElement('button');
        rejouer.classList.add("rejouer");
        rejouer.innerHTML = "↺ Rejouer";
        this.annulerBtn = document.createElement('button');
        this.annulerBtn.classList.add("annuler");
        this.annulerBtn.innerHTML = "↩︎ Annuler";
        for (let i = 0; i < this.grille.rows; i++) {
            const row = document.createElement('tr');
            for (let j = 0; j < this.grille.cols; j++) {
                const pion = document.createElement('td');
                pion.classList.add("pion");
                if (this.grille.tab[i][j].getStatut() === 1) {
                    pion.classList.add("joueur1");
                }
                if (this.grille.tab[i][j].getStatut() === 2) {
                    pion.classList.add("joueur2");
                }
                if (this.pions) {
                    let idx = 0;
                    let text = ["ex", "n", "i", "w"];
                    this.pions.forEach(gagnant => {
                        if (gagnant.x === j && gagnant.y === i) {
                            pion.classList.add('anim');
                            pion.classList.add(text[idx])
                        }
                        idx++;
                    });
                }
                pion.dataset.row = i;
                pion.dataset.col = j;
                pion.onclick = this.clickPion.bind(this);
                row.appendChild(pion);
            }
            table.appendChild(row);
        }
        this.grille.element.appendChild(this.name);
        this.affichageScore.appendChild(this.spanJoueur1);
        this.affichageScore.appendChild(this.tiret);
        this.affichageScore.appendChild(this.spanJoueur2);
        this.grille.element.appendChild(this.affichageScore);
        this.grille.element.appendChild(this.affichageJoueurActuel);
        this.grille.element.appendChild(table);
        table.after(divBtn);
        divBtn.appendChild(rejouer);
        divBtn.appendChild(this.annulerBtn);
        rejouer.onclick = this.reset.bind(this);
        this.annulerBtn.onclick = this.annuler.bind(this);
    }

    clickPion(event) {
        if (this.jeuFini) {
            return false;
        } else {
            const click = event.target;
            const col = parseInt(click.dataset.col);
            for (let row = this.grille.rows - 1; row >= 0; row--) {
                const pion = this.grille.tab[row][col];
                if (pion.getStatut() === 0) {
                    this.coup.push({row, col});
                    pion.setStatut(this.joueurActuel + 1);
                    this.joueurActuel = (this.joueurActuel + 1) % this.joueurs.length;
                    break;
                }
            }
            if (this.checkVictoire()) {
                setTimeout(() => {
                    this.joueurActuel = this.joueurActuel === 0 ? 1 : 0;
                    alert("Le joueur " + (this.joueurActuel + 1) + " a gagné la partie !");
                    this.jeuFini = true;
                    this.ajoutScore();
                    this.reset();
                }, 100);
            } else if (this.checkNulle()) {
                setTimeout(() => {
                    alert("Égalité, personne n'a gagné la partie.")
                    this.jeuFini = true;
                    this.reset();
                }, 100);
            }
            this.initPlateau();
        }
    }

    checkVictoire() {
        const directions = [
            {row: 1, col: 0},
            {row: 0, col: 1},
            {row: 1, col: 1},
            {row: 1, col: -1},
        ];
        for (let row = 0; row < this.grille.rows; row++) {
            for (let col = 0; col < this.grille.cols; col++) {
                const pion = this.grille.tab[row][col];
                if (pion.getStatut() === 0) {
                    continue;
                }
                for (const direction of directions) {
                    let nbr = 1;
                    const couleur = pion.getStatut();
                    let currentRow = row + direction.col;
                    let currentCol = col + direction.row;
                    while (
                        currentRow >= 0 &&
                        currentRow < this.grille.rows &&
                        currentCol >= 0 &&
                        currentCol < this.grille.cols &&
                        this.grille.tab[currentRow][currentCol].getStatut() === couleur
                        ) {
                        nbr++;
                        currentRow += direction.col;
                        currentCol += direction.row;
                    }
                    if (nbr >= 4) {
                        currentRow -= direction.col;
                        currentCol -= direction.row;

                        let pion1 = {y: currentRow, x: currentCol};
                        let pion2 = {y: currentRow - direction.col, x: currentCol - direction.row};
                        let pion3 = {y: currentRow - direction.col * 2, x: currentCol - direction.row * 2};
                        let pion4 = {y: currentRow - direction.col * 3, x: currentCol - direction.row * 3};
                        this.pions = [pion1, pion2, pion3, pion4];
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkNulle() {
        for (let col = 0; col < this.grille.cols; col++) {
            if (this.grille.tab[0][col].getStatut() === 0) {
                return false;
            }
        }
        return true;
    }

    reset() {
        if (window.confirm('Souhaitez-vous relancer une partie ?')) {
            for (let i = 0; i < this.grille.rows; i++) {
                for (let j = 0; j < this.grille.cols; j++) {
                    const pion = this.grille.tab[i][j];
                    pion.setStatut(0);
                }
            }
            this.jeuFini = false;
            this.joueurActuel = Math.floor(Math.random() * 2);
            this.pions = undefined;
            this.initPlateau();
        }
    }

    annuler() {
        if (this.jeuFini) {
            return false;
        } else {
            if (this.coup.length > 0) {
                const dernierCoup = this.coup.pop();
                const pion = this.grille.tab[dernierCoup.row][dernierCoup.col];
                pion.setStatut(0);
                this.joueurActuel = this.joueurActuel === 0 ? 1 : 0;
                this.initPlateau();
            }
        }
    }

    ajoutScore() {
        this.score[this.joueurActuel]++;
    }
}