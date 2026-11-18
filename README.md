# MVPulse

Site vitrine pour le coaching sportif [@_mvpulse_](https://www.instagram.com/_mvpulse_/).

Site statique (HTML / CSS / JS, aucune dépendance ni build) : il se déploie tel quel sur Vercel, Netlify ou GitHub Pages.

## Structure

```
index.html            # Toutes les sections de la page
assets/css/style.css  # Styles (charte noir & doré et polices dans :root en haut du fichier)
assets/js/main.js     # Menu mobile, animations
assets/img/           # Logo (icône, version horizontale), favicon, image de partage, photos
```

## Voir le site en local

```bash
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## Formulaire de contact

La section Contact renvoie vers le Google Form des coachs (bouton « Remplir le questionnaire ») : les réponses arrivent directement dans leur Google Form.
Pour changer de formulaire, remplacer l'URL dans `index.html` (section CONTACT).

## À personnaliser

- [x] Photos et prénoms des coachs (Morgan, Valentin)
- [x] Bio et spécialités de chaque coach (section « L'équipe »)
- [ ] Chiffres clés du hero (`data-count`)
- [ ] Formules et tarifs (à reprendre du post Instagram des tarifs)
- [ ] Vrais témoignages clients (avec leur accord)
- [ ] Email de contact (`index.html` + `CONTACT_EMAIL` dans `assets/js/main.js`)
- [x] Ville / zone d'intervention (Var & Alpes-Maritimes en présentiel, visio à distance)
- [ ] Page mentions légales (obligatoire en France)

## Prochaines étapes

- Déploiement sur Vercel (import du repo GitHub, aucun réglage nécessaire)
- Nom de domaine (ex. `mvpulse.fr`)
- Prise de rendez-vous en ligne (Calendly / Cal.com)

## Opération Black Friday

Bandeau avec compte à rebours, section « Black Friday » et prix barrés dans les tarifs.
Tout s'affiche **automatiquement** entre `BF_START` et `BF_END` (en haut de `assets/js/main.js`) et disparaît seul ensuite.
Les éléments concernés portent la classe `bf-only` dans `index.html`. Pour une prochaine opération, il suffit de changer les dates et les prix.
