# dnaviewer
Browser Based Viewer of DNA, implemented by Moncho Pena.

## Introduction
This repository implements a very simple single page application (SPA) that renders a diagram
and table given some JSON data about a piece of DNA. DNA sequences have particular subsegments that have a special
function. These are called DNA Features. The goal is to show a scientist the Dna Features in a particular DNA
molecule. One way of doing this is with a set of symbols called Synthetic Biology Open Language Visual (SBOL Visual).
Check it out here: http://www.sbolstandard.org/visual
A quick Google Search for "Plasmid Diagram" (plasmids are a type of circular DNA molecule) will show you many different
designs.

### 23-02-2015 Part I
- First I represented JSON in a table, ordered by positions. So I could understand the data.

- For the representation of the molecule the best way is to make a circle.

- I tried to represent the molecule with D3 but I think it's better with pure SVG.

- This project AngularPlasmid (http://angularplasmid.vixis.com/) has given me very good ideas.

- At the moment I've only had time to test and understand the operation of "path" command to make the arches. SVG usability is not obvious.

- Now I know the tools. Next chapter soon ...

### 23-02-2015 Part II
- Arc and image showed

### 23-02-2015 Part III
- First beta is running!

### 24-02-2015
- Version 1.0 - Angry Koala done.


TODO
-------------
- Make a directive, eg:

```
<dnamolecule length="length">
    ...
	<feature name="Terminator" ... >
	</feature>
	...
</dnamolecule>
```

- Improved text layout.

- Show bases only in horizontal.

- ...


Live demo
-------------
My latest updates here:

http://dnaviewer.bdunk.com/

Installation
-----------
```sh
$ git clone <repo URL>
$ cd dnaviewer
$ npm install
$ bower install
```

Run the web app
---------------
```sh
$ grunt serve
```

Access to the web app at http://localhost:9000/.

Distribution command:

```sh
$ grunt build
```