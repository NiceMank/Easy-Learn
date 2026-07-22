/* ============================================================
   highlight.js — Coloration syntaxique maison (ultra légère)
   Aucune dépendance. Travaille sur texte échappé.
   ============================================================ */
(function () {
  'use strict';

  /** Échappe le HTML pour insérer du code en toute sécurité. */
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  const JS_KW = [
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
    'break', 'continue', 'new', 'class', 'extends', 'super', 'this', 'typeof',
    'instanceof', 'in', 'of', 'try', 'catch', 'finally', 'throw', 'switch', 'case',
    'default', 'import', 'export', 'from', 'as', 'async', 'await', 'null',
    'undefined', 'true', 'false', 'delete', 'void', 'yield', 'static', 'get', 'set'
  ].join('|');

  const PHP_KW = [
    'function', 'return', 'if', 'elseif', 'else', 'foreach', 'as', 'for', 'while',
    'do', 'break', 'continue', 'new', 'class', 'extends', 'implements', 'use',
    'namespace', 'public', 'private', 'protected', 'static', 'final', 'abstract',
    'readonly', 'interface', 'trait', 'enum', 'match', 'switch', 'case', 'default',
    'try', 'catch', 'finally', 'throw', 'echo', 'print', 'isset', 'empty', 'unset',
    'require', 'require_once', 'include', 'include_once', 'null', 'true', 'false',
    'fn', 'yield', 'const', 'global', 'instanceof', 'void', 'int', 'string', 'bool',
    'float', 'array', 'object', 'self', 'parent'
  ].join('|');

  function highlightPHP(escaped) {
    return escaped.replace(
      new RegExp(
        '(\\/\\/[^\\n]*|#[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                   // commentaires
        '|(\'(?:[^\'\\\\\\n]|\\\\.)*\'|"(?:[^"\\\\\\n]|\\\\.)*")' +            // chaînes
        '|(\\$[A-Za-z_]\\w*)' +                                              // variables $php
        '|\\b(' + PHP_KW + ')\\b' +                                          // mots-clés
        '|\\b(\\d[\\d_]*(?:\\.\\d+)?\\b)',                                   // nombres
        'g'
      ),
      function (m, com, str, vari, kw, num) {
        if (com) return '<span class="tk-com">' + com + '</span>';
        if (str) return '<span class="tk-str">' + str + '</span>';
        if (vari) return '<span class="tk-prop">' + vari + '</span>';
        if (kw) return '<span class="tk-kw">' + kw + '</span>';
        if (num) return '<span class="tk-num">' + num + '</span>';
        return m;
      }
    );
  }

  function highlightCore(escaped, KWS) {
    return escaped.replace(
      new RegExp(
        '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                       // commentaires
        '|(\'(?:[^\'\\\\\\n]|\\\\.)*\'|"(?:[^"\\\\\\n]|\\\\.)*"|`(?:[^`\\\\]|\\\\[\\s\\S])*`)' + // chaînes
        '|\\b(' + KWS + ')\\b' +                                        // mots-clés
        '|\\b(\\d[\\d_]*(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b)',                 // nombres
        'g'
      ),
      function (m, com, str, kw, num) {
        if (com) return '<span class="tk-com">' + com + '</span>';
        if (str) return '<span class="tk-str">' + str + '</span>';
        if (kw) return '<span class="tk-kw">' + kw + '</span>';
        if (num) return '<span class="tk-num">' + num + '</span>';
        return m;
      }
    );
  }

  function highlightJS(escaped) {
    return highlightCore(escaped, JS_KW);
  }

  const TS_KW_EXTRA = [
    'interface', 'type', 'readonly', 'public', 'private', 'protected',
    'implements', 'abstract', 'declare', 'enum', 'namespace', 'keyof',
    'infer', 'unknown', 'never', 'any', 'satisfies', 'asserts',
    'override', 'is', 'string', 'number', 'boolean', 'object', 'symbol',
    'bigint'
  ].join('|');

  function highlightTS(escaped) {
    return highlightCore(escaped, JS_KW + '|' + TS_KW_EXTRA);
  }

  function highlightCSS(escaped) {
    return escaped.replace(
      /(\/\*[\s\S]*?\*\/)|("[^"\n]*"|'[^'\n]*')|(@[\w-]+)|(#[0-9a-fA-F]{3,8}\b)|\b(\d+(?:\.\d+)?)(px|rem|em|ch|ex|%|vh|vw|vmin|vmax|s|ms|fr|deg|turn)?\b|([a-zA-Z-]+)(?=\s*:)/g,
      function (m, com, str, at, hex, num, unit, prop) {
        if (com) return '<span class="tk-com">' + com + '</span>';
        if (str) return '<span class="tk-str">' + str + '</span>';
        if (at) return '<span class="tk-kw">' + at + '</span>';
        if (hex) return '<span class="tk-val">' + hex + '</span>';
        if (num !== undefined) {
          return '<span class="tk-num">' + num + '</span>' + (unit ? '<span class="tk-val">' + unit + '</span>' : '');
        }
        if (prop) return '<span class="tk-prop">' + prop + '</span>';
        return m;
      }
    );
  }

  function highlightHTML(escaped) {
    // Texte échappé : &lt; et &gt; délimitent les balises.
    return escaped.replace(/&lt;!--[\s\S]*?--&gt;|&lt;\/?[a-zA-Z][\s\S]*?(?:&gt;|$)/g, function (m) {
      if (/^&lt;!--/.test(m)) return '<span class="tk-com">' + m + '</span>';
      return m.replace(/(&lt;\/?)([a-zA-Z][\w-]*)|([\w-]+)(=)("[^"]*")/g,
        function (tok, open, tag, attr, eq, val) {
          if (open) return '<span class="tk-tag">' + open + tag + '</span>';
          return '<span class="tk-attr">' + attr + '</span>' + eq + '<span class="tk-str">' + val + '</span>';
        });
    });
  }


  const PY_KW = [
    'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
    'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from',
    'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or',
    'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
    'None', 'True', 'False', 'print', 'self'
  ].join('|');

  function highlightPython(escaped) {
    return escaped.replace(
      new RegExp(
        '(#[^\\n]*)' +                                                          // commentaires
        '|([fFrRbB]?"""[\\s\\S]*?"""|[fFrRbB]?\'\'\'[\\s\\S]*?\'\'\'|[fFrRbB]?"(?:[^"\\\\\\n]|\\\\.)*"|[fFrRbB]?\'(?:[^\'\\\\\\n]|\\\\.)*\')' + // chaînes (+ triples)
        '|(@[A-Za-z_]\\w*(?:\\.[\\w]+)*)' +                                 // décorateurs @app.route
        '|\\b(' + PY_KW + ')\\b' +                                            // mots-clés
        '|\\b(\\d[\\d_]*(?:\\.\\d+)?\\b)',                            // nombres
        'g'
      ),
      function (m, com, str, dec, kw, num) {
        if (com) return '<span class="tk-com">' + com + '</span>';
        if (str) return '<span class="tk-str">' + str + '</span>';
        if (dec) return '<span class="tk-fn">' + dec + '</span>';
        if (kw) return '<span class="tk-kw">' + kw + '</span>';
        if (num) return '<span class="tk-num">' + num + '</span>';
        return m;
      }
    );
  }
  const C_KW = [
    'int', 'char', 'float', 'double', 'void', 'unsigned', 'signed', 'long',
    'short', 'const', 'static', 'volatile', 'extern', 'register', 'struct',
    'union', 'enum', 'typedef', 'sizeof', 'if', 'else', 'for', 'while', 'do',
    'switch', 'case', 'default', 'break', 'continue', 'return', 'goto',
    'inline', 'restrict', '_Bool', '_Alignof', '_Alignas', 'auto'
  ].join('|');

  const C_CONST = [
    'NULL', 'EOF', 'EXIT_SUCCESS', 'EXIT_FAILURE', 'true', 'false',
    'SEEK_SET', 'SEEK_CUR', 'SEEK_END', 'BUFSIZ', 'FILENAME_MAX',
    'INT_MAX', 'INT_MIN', 'CHAR_MAX', 'CHAR_MIN', 'UCHAR_MAX', 'UINT_MAX',
    'LONG_MAX', 'ULONG_MAX', 'RAND_MAX', 'NDEBUG', 'ERANGE', 'EDOM', 'EINVAL'
  ].join('|');

  const C_LIB = [
    'printf', 'fprintf', 'sprintf', 'snprintf', 'scanf', 'fscanf', 'sscanf',
    'puts', 'putchar', 'getchar', 'fputs', 'fgets', 'fgetc', 'fputc',
    'fopen', 'fclose', 'fread', 'fwrite', 'fseek', 'ftell', 'rewind',
    'fflush', 'remove', 'rename', 'feof', 'ferror', 'perror',
    'malloc', 'calloc', 'realloc', 'free',
    'strlen', 'strcpy', 'strncpy', 'strcmp', 'strncmp', 'strcat', 'strncat',
    'strchr', 'strstr', 'strtok', 'strdup',
    'memcpy', 'memmove', 'memset', 'memcmp',
    'atoi', 'atof', 'atol', 'strtol', 'strtod', 'strtoul',
    'exit', 'abort', 'assert', 'qsort', 'bsearch',
    'isdigit', 'isalpha', 'isspace', 'toupper', 'tolower',
    'errno', 'strerror'
  ].join('|');

  function highlightC(escaped) {
    return escaped.replace(
      new RegExp(
        '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                 // commentaires
        '|("(?:[^"\\\\\\n]|\\\\.)*")' +                           // chaînes
        '|(\\\'(?:[^\'\\\\\\n]|\\\\.)*\\\')' +                    // caractères 'a', '\0'
        '|(^|\\n)([ \\t]*#[^\\n]*)' +                             // préprocesseur (lignes #)
        '|\\b(' + C_KW + ')\\b' +                                 // mots-clés C
        '|\\b(' + C_CONST + ')\\b' +                              // constantes std
        '|\\b(' + C_LIB + ')\\b' +                                // fonctions libc
        '|\\b(0[xX][0-9a-fA-F]+\\b|\\b\\d[\\d_]*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fFuUlL]*\\b)', // nombres
        'g'
      ),
      function (m, com, str, chr, preNl, pre, kw, konst, lib, num) {
        if (com) return '<span class="tk-com">' + com + '</span>';
        if (str) return '<span class="tk-str">' + str + '</span>';
        if (chr) return '<span class="tk-str">' + chr + '</span>';
        if (pre) return (preNl || '') + '<span class="tk-kw">' + pre + '</span>';
        if (kw) return '<span class="tk-kw">' + kw + '</span>';
        if (konst) return '<span class="tk-val">' + konst + '</span>';
        if (lib) return '<span class="tk-fn">' + lib + '</span>';
        if (num) return '<span class="tk-num">' + num + '</span>';
        return m;
      }
    );
  }

  const JAVA_KW = [
    'abstract', 'assert', 'boolean', 'break', 'byte', 'case', 'catch', 'char',
    'class', 'const', 'continue', 'default', 'do', 'double', 'else', 'enum',
    'extends', 'final', 'finally', 'float', 'for', 'goto', 'if', 'implements',
    'import', 'instanceof', 'int', 'interface', 'long', 'native', 'new',
    'package', 'permits', 'private', 'protected', 'public', 'record', 'return',
    'sealed', 'short', 'static', 'strictfp', 'super', 'switch', 'synchronized',
    'this', 'throw', 'throws', 'transient', 'try', 'var', 'void', 'volatile',
    'while', 'yield'
  ].join('|');

  const JAVA_TYPE = [
    'String', 'Integer', 'Long', 'Double', 'Float', 'Boolean', 'Character',
    'Byte', 'Short', 'Number', 'Object', 'Void', 'Enum', 'Record', 'Class',
    'Math', 'System', 'Runtime', 'Thread', 'ThreadLocal', 'Runnable',
    'Callable', 'StringBuilder', 'StringBuffer', 'StringJoiner', 'CharSequence',
    'Comparable', 'Comparator', 'Iterable', 'Iterator', 'ListIterator',
    'List', 'ArrayList', 'LinkedList', 'Vector', 'Stack', 'Queue', 'Deque',
    'ArrayDeque', 'PriorityQueue', 'Set', 'HashSet', 'LinkedHashSet', 'TreeSet',
    'SortedSet', 'NavigableSet', 'Map', 'HashMap', 'LinkedHashMap', 'TreeMap',
    'Hashtable', 'SortedMap', 'NavigableMap', 'ConcurrentHashMap',
    'CopyOnWriteArrayList', 'Optional', 'OptionalInt', 'OptionalLong',
    'OptionalDouble', 'Stream', 'IntStream', 'LongStream', 'DoubleStream',
    'Collectors', 'Collector', 'Arrays', 'Collections', 'Objects', 'UUID',
    'Random', 'Scanner', 'Pattern', 'Matcher', 'BigDecimal', 'BigInteger',
    'LocalDate', 'LocalDateTime', 'LocalTime', 'Instant', 'Duration', 'Period',
    'ZoneId', 'ZonedDateTime', 'DateTimeFormatter', 'Path', 'Paths', 'Files',
    'StandardCopyOption', 'StandardOpenOption', 'StandardCharsets',
    'FileReader', 'FileWriter', 'BufferedReader', 'BufferedWriter',
    'InputStream', 'OutputStream', 'InputStreamReader', 'OutputStreamWriter',
    'PrintStream', 'PrintWriter', 'Reader', 'Writer', 'ObjectInputStream',
    'ObjectOutputStream', 'Serializable', 'AutoCloseable', 'Closeable',
    'Exception', 'RuntimeException', 'Throwable', 'Error',
    'NullPointerException', 'IllegalArgumentException',
    'IllegalStateException', 'IndexOutOfBoundsException',
    'ArrayIndexOutOfBoundsException', 'ClassCastException',
    'NumberFormatException', 'IOException', 'UncheckedIOException',
    'FileNotFoundException', 'NoSuchFileException', 'NotSerializableException',
    'InvalidClassException', 'SQLException', 'ParseException',
    'InterruptedException', 'ExecutionException', 'TimeoutException',
    'UnsupportedClassVersionError', 'OutOfMemoryError', 'StackOverflowError',
    'ConcurrentModificationException', 'ClassNotFoundException',
    'NoSuchMethodError', 'NoSuchElementException',
    'UnsupportedOperationException', 'ExecutorService', 'Executors', 'Executor',
    'Future', 'CompletableFuture', 'CompletionStage', 'TimeUnit',
    'CountDownLatch', 'Semaphore', 'ReentrantLock', 'AtomicInteger',
    'AtomicLong', 'AtomicBoolean', 'ForkJoinPool', 'HttpClient', 'HttpRequest',
    'HttpResponse', 'Override', 'Deprecated', 'SuppressWarnings',
    'FunctionalInterface', 'SafeVarargs', 'Serial', 'Retention', 'Target',
    'RetentionPolicy', 'ElementType', 'SpringApplication',
    'SpringBootApplication', 'Component', 'Service', 'Repository', 'Controller',
    'RestController', 'Configuration', 'Bean', 'Autowired', 'Lazy',
    'GetMapping', 'PostMapping', 'PutMapping', 'PatchMapping', 'DeleteMapping',
    'RequestMapping', 'RequestParam', 'RequestBody', 'PathVariable',
    'ResponseBody', 'ResponseEntity', 'RestControllerAdvice',
    'ExceptionHandler', 'Valid', 'Entity', 'Table', 'Id', 'GeneratedValue',
    'Transient', 'Column', 'Test', 'BeforeEach', 'JavaLanguageVersion',
    'Predicate', 'Function', 'Consumer', 'Supplier', 'BiFunction',
    'BiConsumer', 'BiPredicate', 'UnaryOperator', 'BinaryOperator',
    'IntPredicate', 'LongPredicate', 'ToLongFunction', 'IntFunction',
    'DoublePredicate', 'Comparator'
  ].join('|');

  function highlightJava(escaped) {
    return escaped.replace(
      new RegExp(
        '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                 // commentaires
        '|("(?:[^"\\\\\\n]|\\\\.)*")' +                           // chaînes "…"
        '|(\\\'(?:[^\'\\\\\\n]|\\\\.)*\\\')' +                    // caractères 'a', '\n'
        '|(@[A-Za-z_]\\w*)' +                                     // annotations @Override
        '|\\b(' + JAVA_KW + ')\\b' +                              // mots-clés
        '|\\b(null|true|false)\\b' +                              // littéraux
        '|\\b(' + JAVA_TYPE + ')\\b' +                            // types & APIs usuels
        '|\\b([A-Za-z_]\\w*)(?=\\s*\\()' +                        // appels de méthodes
        '|\\b(0[xX][0-9a-fA-F_]+\\b|0[bB][01_]+\\b|\\b\\d[\\d_]*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fFdDlL]*\\b)', // nombres
        'g'
      ),
      function (m, com, str, chr, ann, kw, konst, typ, fn, num) {
        if (com) return '<span class="tk-com">' + com + '</span>';
        if (str) return '<span class="tk-str">' + str + '</span>';
        if (chr) return '<span class="tk-str">' + chr + '</span>';
        if (ann) return '<span class="tk-attr">' + ann + '</span>';
        if (kw) return '<span class="tk-kw">' + kw + '</span>';
        if (konst) return '<span class="tk-val">' + konst + '</span>';
        if (typ) return '<span class="tk-val">' + typ + '</span>';
        if (fn) return '<span class="tk-fn">' + fn + '</span>';
        if (num) return '<span class="tk-num">' + num + '</span>';
        return m;
      }
    );
  }

  // API publique
  window.High = {
    esc: esc,
    /** Colorise du code BRUT selon le langage ('html' | 'css' | 'js' | 'ts' | 'c' | 'php' | 'py' | 'java'). */
    run: function (code, lang) {
      const escaped = esc(code);
      if (lang === 'js' || lang === 'javascript') return highlightJS(escaped);
      if (lang === 'ts' || lang === 'typescript') return highlightTS(escaped);
      if (lang === 'c') return highlightC(escaped);
      if (lang === 'java' || lang === 'kotlin') return highlightJava(escaped);
      if (lang === 'php') return highlightPHP(escaped);
      if (lang === 'py' || lang === 'python') return highlightPython(escaped);
      if (lang === 'css') return highlightCSS(escaped);
      if (lang === 'html') return highlightHTML(escaped);
      return escaped;
    }
  };
})();
