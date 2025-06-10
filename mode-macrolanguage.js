define('ace/mode/macrolanguage',['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text',  'ace/tokenizer', 'ace/mode/macrolanguage_highlight_rules'], function(require, exports, module) {

var oop =  require("../lib/oop");
var TextMode =  require("./text").Mode;
var Tokenizer = require("../tokenizer").Tokenizer;
var MacroLanguageHighlightRules = require("./macrolanguage_highlight_rules").MacroLanguageHighlightRules;

var Mode = function() {
    this.$tokenizer = new Tokenizer(new MacroLanguageHighlightRules().getRules());
};
oop.inherits(Mode, TextMode);


(function() {
    this.createWorker = function(session) {
        return null;
    };

    // Ajout : autocompletion Ace moderne
    this.getCompletions = function(editor, session, pos, prefix, callback) {
        var keywords = [
            "ABS","ACOS","TOUT","ASCII","ASIN","ATAN","ATAN2","BINAIRE",
            "BINARY","CHANGER_ENVIRONNEMENT","CHANGE_ENVIRONMENT","FERMER_FICHIER",
            "CLOSE_FILE","CONCAT_ANC","APPEND","COS","CREER_ENVIRONNEMENT","CREATE_ENVIRONMENT",
            "DATE","DEFINITION","DEFINE","SUPPRIMER","DELETE","SUPPRIMER_ENVIRONNEMENT","DELETE_ENVIRONMENT",
            "SUPPRIMER_MACRO","DELETE_MACRO","SUPPRIMER_VAR","DELETE_VAR","DETAIL","AFFICHER","DISPLAY","DIV","E",
            "SINON","ELSE","SINON_SI","ELSE_IF","FIN_DEFINITION","END_DEFINE","FIN_SI","END_IF","FIN_TANT_QUE","END_WHILE",
            "ENVIRONNEMENT","ENVIRONMENT","ERREUR","ERROR","EXECUTER","EXECUTE","EXP","CHAMP_SEP","FIELD_SEP","FAUX","FALSE",
            "ENT","INT","FNAWK","FRACT","SI","IF","DANS","IN","GAUCHE","LEFT","LONGUEUR","LENGTH","SOIT","LET","LISTER","LIST","LN",
            "CHARGER","LOAD","LOCAL","LOG","ET","AND","OU","OR","OU_EXCL","EXOR","MINUSCULE","LOWER","MACRO","MEMOIRE","MEMORY",
            "MESSAGE","MODULO","RESTE","MOD","NOM","NAME","NON","NOT","NOMBRE","NUMBER","OUVRIR_FICHIER","OPEN_FILE","PI","PUISSANCE",
            "POWER","LIRE_FICHIER","READ_FILE","REPETER","REPEAT","DROITE","RIGHT","ARRONDI","ROUND","RPT","SAUVER","SAVE","SIN",
            "SQL_COMMIT","SQL_CONNECT","SQL_CREATE","SQL_DECONNECT","SQL_DISCONNECT","SQL_DECONNECT_RB","SQL_DISCONNECT_RB",
            "SQL_DELETE","SQL_DROP","SQL_INSERT","SQL_QUERY","SQL_ROLLBACK","SQL_UPDATE","SQRT","CARRE","SQR","CHAINE","STR",
            "SOUS_CHAINE","SUBSTR","SUPP_ANC","DEL_OLD","SYSTEME","SYSTEM","TAN","HEURE","TIME","TRACE","TRACE_FIN","TRACE_OFF",
            "OTEBLANCS","TRIM","VRAI","TRUE","TYPEVAR","JUSQU_A","UNTIL","MAJUSCULE","UPPER","VARIABLE","VERSION","TANT_QUE",
            "WHILE","ECRIRE_FICHIER","WRITE_FILE","SQL_EXPORT","FORCE","WINEXE","BEEP","ACCES_FICHIER","FILE_ACCESS","TROUVER_CHAINE",
            "FIND_STR","REMPLACER_CHAINE","REPLACE_STR","SORTIE_BOUCLE","EXIT_LOOP","SORTIE_MACRO","EXIT_MACRO","LIRE_TABLE",
            "READ_TABLE","SELON","USING","AVEC","WITH","WINEXE32","RACINE","SUPER","COURANT",
            // lower case (pour la complétion insensible à la casse)
            "abs","acos","tout","ascii","asin","atan","atan2","binaire",
            "binary","changer_environnement","change_environment","fermer_fichier",
            "close_file","concat_anc","append","cos","creer_environnement","create_environment",
            "date","definition","define","supprimer","delete","supprimer_environnement","delete_environment",
            "supprimer_macro","delete_macro","supprimer_var","delete_var","detail","afficher","display","div","e",
            "sinon","else","sinon_si","else_if","fin_definition","end_define","fin_si","end_if","fin_tant_que","end_while",
            "environnement","environment","erreur","error","executer","execute","exp","champ_sep","field_sep","faux","false",
            "ent","int","fnawk","fract","si","if","dans","in","gauche","left","longueur","length","soit","let","lister","list","ln",
            "charger","load","local","log","et","and","ou","or","ou_excl","exor","minuscule","lower","macro","memoire","memory",
            "message","modulo","reste","mod","nom","name","non","not","nombre","number","ouvrir_fichier","open_file","pi","puissance",
            "power","lire_fichier","read_file","repeter","repeat","droite","right","arrondi","round","rpt","sauver","save","sin",
            "sql_commit","sql_connect","sql_create","sql_deconnect","sql_disconnect","sql_deconnect_rb","sql_disconnect_rb",
            "sql_delete","sql_drop","sql_insert","sql_query","sql_rollback","sql_update","sqrt","carre","sqr","chaine","str",
            "sous_chaine","substr","supp_anc","del_old","systeme","system","tan","heure","time","trace","trace_fin","trace_off",
            "oteblancs","trim","vrai","true","typevar","jusqu_a","until","majuscule","upper","variable","version","tant_que",
            "while","ecrire_fichier","write_file","sql_export","force","winexe","beep","acces_fichier","file_access","trouver_chaine",
            "find_str","remplacer_chaine","replace_str","sortie_boucle","exit_loop","sortie_macro","exit_macro","lire_table",
            "read_table","selon","using","avec","with","winexe32","racine","super","courant"
        ];
        var completions = keywords
            .filter(function(word) {
                return !prefix || word.toLowerCase().startsWith(prefix.toLowerCase());
            })
            .map(function(word) {
                return {
                    caption: word,
                    value: word,
                    meta: "keyword",
                    score: 1000
                };
            });
        callback(null, completions);
    };

}).call(Mode.prototype);

exports.Mode = Mode;
});



define('ace/mode/macrolanguage_highlight_rules',['require', 'exports', 'module' , 'ace/lib/oop','ace/lib/lang',  'ace/mode/doc_comment_highlight_rules', 'ace/mode/text_highlight_rules'], function(require, exports, module) {

	var oop =  require("../lib/oop");
	var lang = require("../lib/lang");
	var DocCommentHighlightRules = require("./doc_comment_highlight_rules").DocCommentHighlightRules;
	var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

	var MacroLanguageHighlightRules = function() {

	    // taken from http://download.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html
	    var keywords = (
	    ("ABS|ACOS|TOUT|ASCII|ASIN|ATAN|ATAN2|BINAIRE|"+
	     "BINARY|CHANGER_ENVIRONNEMENT|CHANGE_ENVIRONMENT|FERMER_FICHIER|" +
	     "CLOSE_FILE|CONCAT_ANC|APPEND|COS|CREER_ENVIRONNEMENT|CREATE_ENVIRONMENT|" +
	     "DATE|DEFINITION|DEFINE|SUPPRIMER|DELETE|SUPPRIMER_ENVIRONNEMENT|DELETE_ENVIRONMENT|" +
	     "SUPPRIMER_MACRO|DELETE_MACRO|SUPPRIMER_VAR|DELETE_VAR|DETAIL|AFFICHER|DISPLAY|DIV|E|" +
	     "SINON|ELSE|SINON_SI|ELSE_IF|FIN_DEFINITION|END_DEFINE|FIN_SI|END_IF|FIN_TANT_QUE|END_WHILE|" +
	     "ENVIRONNEMENT|ENVIRONMENT|ERREUR|ERROR|EXECUTER|EXECUTE|EXP|CHAMP_SEP|FIELD_SEP|FAUX|FALSE|" +
	     "ENT|INT|FNAWK|FRACT|SI|IF|DANS|IN|GAUCHE|LEFT|LONGUEUR|LENGTH|SOIT|LET|LISTER|LIST|LN|" +
	     "CHARGER|LOAD|LOCAL|LOG|ET|AND|OU|OR|OU_EXCL|EXOR|MINUSCULE|LOWER|MACRO|MEMOIRE|MEMORY|" +
	     "MESSAGE|MODULO|RESTE|MOD|NOM|NAME|NON|NOT|NOMBRE|NUMBER|OUVRIR_FICHIER|OPEN_FILE|PI|PUISSANCE|" +
	     "POWER|LIRE_FICHIER|READ_FILE|REPETER|REPEAT|DROITE|RIGHT|ARRONDI|ROUND|RPT|SAUVER|SAVE|SIN|" +
	     "SQL_COMMIT|SQL_CONNECT|SQL_CREATE|SQL_DECONNECT|SQL_DISCONNECT|SQL_DECONNECT_RB|SQL_DISCONNECT_RB|" +
	     "SQL_DELETE|SQL_DROP|SQL_INSERT|SQL_QUERY|SQL_ROLLBACK|SQL_UPDATE|SQRT|CARRE|SQR|CHAINE| STR|" +
	     "SOUS_CHAINE|SUBSTR|SUPP_ANC|DEL_OLD|SYSTEME|SYSTEM|TAN|HEURE|TIME|TRACE|TRACE_FIN|TRACE_OFF|" +
	     "OTEBLANCS|TRIM|VRAI|TRUE|TYPEVAR|JUSQU_A|UNTIL|MAJUSCULE|UPPER|VARIABLE|VERSION|TANT_QUE|" +
	     "WHILE|ECRIRE_FICHIER|WRITE_FILE|SQL_EXPORT|FORCE|WINEXE|BEEP|ACCES_FICHIER|FILE_ACCESS|TROUVER_CHAINE|" +
	     "FIND_STR|REMPLACER_CHAINE|REPLACE_STR|SORTIE_BOUCLE|EXIT_LOOP|SORTIE_MACRO|EXIT_MACRO|LIRE_TABLE|" +
	     "READ_TABLE|SELON|USING|AVEC|WITH|WINEXE32|RACINE|SUPER|COURANT|" +
	     "abs|acos|tout|ascii|asin|atan|atan2|binaire|"+
	     "binary|changer_environnement|change_environment|fermer_fichier|" +
	     "close_file|concat_anc|append|cos|creer_environnement|create_environment|" +
	     "date|definition|define|supprimer|delete|supprimer_environnement|delete_environment|" +
	     "supprimer_macro|delete_macro|supprimer_var|delete_var|detail|afficher|display|div|e|" +
	     "sinon|else|sinon_si|else_if|fin_definition|end_define|fin_si|end_if|fin_tant_que|end_while|" +
	     "environnement|environment|erreur|error|executer|execute|exp|champ_sep|field_sep|faux|false|" +
	     "ent|int|fnawk|fract|si|if|dans|in|gauche|left|longueur|length|soit|let|lister|list|ln|" +
	     "charger|load|local|log|et|and|ou|or|ou_excl|exor|minuscule|lower|macro|memoire|memory|" +
	     "message|modulo|reste|mod|nom|name|non|not|nombre|number|ouvrir_fichier|open_file|pi|puissance|" +
	     "power|lire_fichier|read_file|repeter|repeat|droite|right|arrondi|round|rpt|sauver|save|sin|" +
	     "sql_commit|sql_connect|sql_create|sql_deconnect|sql_disconnect|sql_deconnect_rb|sql_disconnect_rb|" +
	     "sql_delete|sql_drop|sql_insert|sql_query|sql_rollback|sql_update|sqrt|carre|sqr|chaine| str|" +
	     "sous_chaine|substr|supp_anc|del_old|systeme|system|tan|heure|time|trace|trace_fin|trace_off|" +
	     "oteblancs|trim|vrai|true|typevar|jusqu_a|until|majuscule|upper|variable|version|tant_que|" +
	     "while|ecrire_fichier|write_file|sql_export|force|winexe|beep|acces_fichier|file_access|trouver_chaine|" +
	     "find_str|remplacer_chaine|replace_str|sortie_boucle|exit_loop|sortie_macro|exit_macro|lire_table|" +
	     "read_table|selon|using|avec|with|winexe32|racine|super|courant")
	    );


	    var keywordMapper = this.createKeywordMapper({ 
	        "variable.language": "this",
	    	"keyword": keywords
	    }, "identifier");
	    // regexp must not have capturing parentheses. Use (?:) instead.
	    // regexps are ordered -> the first match is used

	    this.$rules = {
	        "start" : [

	            DocCommentHighlightRules.getStartRule("doc-start"),
	            {
	                token : "comment", // multi line comment
	                merge : true,
	                regex : "\\/\\*",
	                next : "comment"
	            }, {
	                token : "string", // single line
	                regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
	            }, {
	                token : "string", // single line
	                regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
	            }, {
	                token : "constant.numeric", // hex
	                regex : "0[xX][0-9a-fA-F]+\\b"
	            }, {
	                token : "constant.numeric", // float
	                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
	            }, {
	                token : "constant.language.boolean",
	                regex : "(?:true|false|vrai|faux)\\b"
	            }, {
	            	  token : keywordMapper,
	                  regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
	            }, {
	                token : "keyword.operator",
	                regex : "!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\b(?:in|instanceof|new|delete|typeof|void)"
	            }, {
	                token : "text",
	                regex : "\\s+"
	            }
	        ],
	        "comment" : [
	                     {
	                         token : "comment", // closing comment
	                         regex : ".*?\\*\\/",
	                         next : "start"
	                     }, {
	                         token : "comment", // comment spanning whole line
	                         merge : true,
	                         regex : ".+"
	                     }
	                 ]
	    };
	    
	    this.embedRules(DocCommentHighlightRules, "doc-",
	            [ DocCommentHighlightRules.getEndRule("start") ]);
	};

	oop.inherits(MacroLanguageHighlightRules, TextHighlightRules);
	exports.MacroLanguageHighlightRules = MacroLanguageHighlightRules;
	});

define('ace/mode/doc_comment_highlight_rules', ['require', 'exports', 'module' , 'ace/lib/oop', 'ace/mode/text_highlight_rules'], function(require, exports, module) {


	var oop = require("../lib/oop");
	var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

	var DocCommentHighlightRules = function() {

	    this.$rules = {
	        "start" : [ {
	            token : "comment.doc.tag",
	            regex : "@[\\w\\d_]+" // TODO: fix email addresses
	        }, {
	            token : "comment.doc.tag",
	            regex : "\\bTODO\\b"
	        }, {
	            defaultToken : "comment.doc"
	        }]
	    };
	};

	oop.inherits(DocCommentHighlightRules, TextHighlightRules);

	DocCommentHighlightRules.getStartRule = function(start) {
	    return {
	        token : "comment.doc", // doc comment
	        regex : "\\/\\*(?=\\*)",
	        next  : start
	    };
	};

	DocCommentHighlightRules.getEndRule = function (start) {
	    return {
	        token : "comment.doc", // closing comment
	        regex : "\\*\\/",
	        next  : start
	    };
	};


	exports.DocCommentHighlightRules = DocCommentHighlightRules;

	});
