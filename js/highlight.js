/* ============================================================
   highlight.js — Coloration syntaxique maison (ultra légère)
   Aucune dépendance. Travaille sur texte échappé.
   Palette Atom One Dark (fond #282c34, texte #abb2bf).
   ============================================================ */
(function () {
  'use strict';

  /** Échappe le HTML pour insérer du code en toute sécurité. */
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ==============================================================
     LEXIQUE PARTAGÉ
     ============================================================== */

  const JS_KW = [
    'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
    'break', 'continue', 'new', 'class', 'extends', 'super', 'this', 'typeof',
    'instanceof', 'in', 'of', 'try', 'catch', 'finally', 'throw', 'switch', 'case',
    'default', 'import', 'export', 'from', 'as', 'async', 'await', 'null',
    'undefined', 'true', 'false', 'delete', 'void', 'yield', 'static', 'get', 'set'
  ].join('|');

  /* Objets et APIs courants — colorés comme une valeur (tk-val) */
  const JS_BUILTINS = [
    'console', 'Math', 'JSON', 'Object', 'Array', 'String', 'Number', 'Boolean',
    'RegExp', 'Date', 'Map', 'Set', 'Promise', 'Symbol', 'BigInt',
    'Error', 'TypeError', 'SyntaxError', 'RangeError',
    'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'eval',
    'document', 'window', 'navigator', 'location', 'history',
    'localStorage', 'sessionStorage',
    'setTimeout', 'setInterval', 'clearTimeout', 'clearInterval',
    'fetch', 'Headers', 'Request', 'Response', 'AbortController',
    'FormData', 'URLSearchParams', 'Blob', 'File', 'FileReader',
    'addEventListener', 'removeEventListener', 'dispatchEvent',
    'querySelector', 'querySelectorAll', 'getElementById', 'createElement',
    'appendChild', 'removeChild', 'classList',
    'require', 'module', 'exports', 'process', 'Buffer', '__dirname', '__filename',
    'describe', 'it', 'test', 'expect', 'beforeEach', 'afterEach',
    'useState', 'useEffect', 'useRef', 'useMemo', 'useCallback', 'useContext',
    'useReducer', 'useRouter', 'useRoute', 'useStore', 'useFetch',
    'ref', 'reactive', 'computed', 'watch', 'watchEffect', 'onMounted',
    'onUnmounted', 'defineProps', 'defineEmits', 'defineExpose',
    'createApp', 'createRouter', 'createPinia', 'defineStore',
    'storeToRefs', 'nextTick', 'toRefs', 'toRef', 'toValue',
    'PrismaClient', 'Pool', 'mongoose', 'Schema', 'model',
    'multer', 'session', 'cors', 'helmet', 'morgan', 'compression',
    'bcrypt', 'jsonwebtoken', 'jwt', 'dotenv', 'axios',
    'pg', 'mysql2', 'sqlite3', 'redis',
    'useToggle', 'useDebounce', 'useLocalStorage', 'useSouris'
  ].join('|');

  const PHP_KW = [
    'function', 'return', 'if', 'elseif', 'else', 'foreach', 'as', 'for', 'while',
    'do', 'break', 'continue', 'new', 'class', 'extends', 'implements', 'use',
    'namespace', 'public', 'private', 'protected', 'static', 'final', 'abstract',
    'readonly', 'interface', 'trait', 'enum', 'match', 'switch', 'case', 'default',
    'try', 'catch', 'finally', 'throw', 'echo', 'print', 'isset', 'empty', 'unset',
    'require', 'require_once', 'include', 'include_once', 'null', 'true', 'false',
    'fn', 'yield', 'const', 'global', 'instanceof', 'void', 'int', 'string', 'bool',
    'float', 'array', 'object', 'self', 'parent', 'declare', 'list', 'clone',
    'insteadof', 'goto', 'callable', 'iterable', 'mixed', 'never'
  ].join('|');

  const PHP_BUILTINS = [
    'array_map', 'array_filter', 'array_reduce', 'array_merge', 'array_keys',
    'array_values', 'array_key_exists', 'array_column', 'array_unique',
    'array_push', 'array_pop', 'array_shift', 'array_unshift', 'array_slice',
    'array_splice', 'array_search', 'in_array', 'array_sum', 'array_product',
    'array_count_values', 'array_fill', 'array_combine', 'array_diff',
    'array_intersect', 'array_reverse', 'array_rand', 'shuffle',
    'count', 'sort', 'asort', 'ksort', 'usort', 'rsort',
    'implode', 'explode', 'strlen', 'strpos', 'str_replace', 'substr',
    'trim', 'ltrim', 'rtrim', 'strtolower', 'strtoupper', 'ucfirst',
    'sprintf', 'printf', 'number_format', 'nl2br', 'wordwrap',
    'json_encode', 'json_decode', 'serialize', 'unserialize',
    'file_get_contents', 'file_put_contents', 'fopen', 'fclose', 'fgets',
    'fwrite', 'fread', 'feof', 'file_exists', 'is_file', 'is_dir',
    'mkdir', 'rmdir', 'unlink', 'rename', 'copy', 'move_uploaded_file',
    'mime_content_type', 'pathinfo', 'basename', 'dirname', 'realpath',
    'getenv', 'putenv', 'phpinfo', 'phpversion', 'ini_get', 'ini_set',
    'error_log', 'error_reporting', 'set_error_handler',
    'header', 'http_response_code', 'setcookie', 'session_start',
    'session_destroy', 'session_regenerate_id',
    'password_hash', 'password_verify', 'password_needs_rehash',
    'hash', 'hash_equals', 'md5', 'sha1', 'bin2hex', 'random_bytes',
    'filter_var', 'filter_input', 'filter_var_array',
    'preg_match', 'preg_replace', 'preg_split',
    'htmlspecialchars', 'htmlentities', 'strip_tags', 'urlencode', 'urldecode',
    'date', 'time', 'strtotime', 'gmdate', 'microtime',
    'var_dump', 'print_r', 'debug_backtrace', 'gettype', 'get_class',
    'is_int', 'is_string', 'is_array', 'is_object', 'is_bool', 'is_null',
    'is_numeric', 'is_callable', 'is_iterable',
    'PDO', 'PDOStatement', 'PDOException', 'new PDO',
    'mysqli', 'mysql', 'sqlite',
    'Composer', 'autoload', 'strval', 'intval', 'floatval', 'boolval',
    'getimagesize', 'imagecreatefromjpeg', 'imagepng', 'imagedestroy',
    'mb_strlen', 'mb_strtolower', 'mb_substr', 'mb_check_encoding',
    'DateTime', 'DateTimeImmutable', 'DateTimeZone', 'DateInterval',
    'Exception', 'ErrorException', 'RuntimeException', 'LogicException',
    'InvalidArgumentException', 'UnexpectedValueException', 'Throwable',
    'Closure', 'ReflectionClass', 'ReflectionMethod',
    'curl_init', 'curl_exec', 'curl_close', 'curl_setopt'
  ].join('|');

  const PY_KW = [
    'and', 'as', 'assert', 'async', 'await', 'break', 'class', 'continue',
    'def', 'del', 'elif', 'else', 'except', 'finally', 'for', 'from',
    'global', 'if', 'import', 'in', 'is', 'lambda', 'nonlocal', 'not', 'or',
    'pass', 'raise', 'return', 'try', 'while', 'with', 'yield',
    'None', 'True', 'False', 'print', 'self'
  ].join('|');

  const PY_BUILTINS = [
    'len', 'range', 'enumerate', 'zip', 'map', 'filter', 'reversed', 'sorted',
    'sum', 'min', 'max', 'abs', 'round', 'int', 'str', 'float', 'bool', 'list',
    'dict', 'tuple', 'set', 'frozenset', 'type', 'isinstance', 'issubclass',
    'hasattr', 'getattr', 'setattr', 'delattr', 'dir', 'id', 'hash', 'repr',
    'open', 'print', 'input', 'format', 'super', 'property', 'staticmethod',
    'classmethod', 'any', 'all', 'next', 'iter', 'slice', 'bytes', 'bytearray',
    '__init__', '__str__', '__repr__', '__name__', '__main__',
    'json', 'os', 'sys', 're', 'math', 'random', 'datetime', 'collections',
    'defaultdict', 'OrderedDict', 'Counter', 'namedtuple', 'deque', 'ChainMap',
    'Path', 'Pathlib', 'Flask', 'request', 'jsonify', 'render_template',
    'redirect', 'url_for', 'session', 'g', 'Blueprint', 'current_app',
    'abort', 'make_response', 'send_file', 'send_from_directory',
    'Django', 'HttpResponse', 'JsonResponse', 'render', 'get_object_or_404',
    'get_list_or_404', 'reverse', 'resolve', 'QuerySet', 'Model', 'objects',
    'filter', 'exclude', 'annotate', 'aggregate', 'values', 'values_list',
    'select_related', 'prefetch_related', 'order_by', 'distinct',
    'pytest', 'unittest', 'mock', 'patch', 'MagicMock'
  ].join('|');

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
    'DoublePredicate', 'Comparator',
    'Connection', 'DriverManager', 'DataSource', 'PreparedStatement',
    'ResultSet', 'ResultSetMetaData', 'Statement', 'CallableStatement',
    'DataAccessException', 'JdbcTemplate', 'RowMapper', 'JpaRepository',
    'CrudRepository', 'PagingAndSortingRepository', 'Page', 'Pageable',
    'PageRequest', 'Sort', 'EntityManager', 'Transactional',
    'NotNull', 'NotEmpty', 'NotBlank', 'Size', 'Min', 'Max', 'Pattern',
    'Email', 'Positive', 'PositiveOrZero', 'Past', 'Future',
    'Getter', 'Setter', 'ToString', 'EqualsAndHashCode', 'Builder',
    'NoArgsConstructor', 'AllArgsConstructor', 'Data', 'Slf4j', 'Log',
    'Logger', 'LoggerFactory', 'Mockito', 'Mock', 'InjectMocks', 'Spy',
    'BeforeAll', 'AfterAll', 'AfterEach', 'DisplayName',
    'ParameterizedTest', 'assertEquals', 'assertTrue', 'assertFalse',
    'assertNotNull', 'assertThrows'
  ].join('|');

  const BASH_KW = [
    'if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done',
    'case', 'esac', 'in', 'function', 'return', 'exit', 'export',
    'local', 'readonly', 'unset', 'declare', 'eval', 'exec', 'source',
    'shift', 'alias', 'unalias', 'true', 'false', 'test',
    'cd', 'ls', 'cp', 'mv', 'rm', 'mkdir', 'rmdir', 'touch', 'cat',
    'echo', 'printf', 'grep', 'sed', 'awk', 'sort', 'uniq', 'wc',
    'head', 'tail', 'find', 'xargs', 'chmod', 'chown', 'sudo',
    'apt', 'brew', 'yum', 'pacman', 'npm', 'npx', 'node', 'pip',
    'composer', 'docker', 'git', 'curl', 'wget', 'ssh', 'scp',
    'systemctl', 'service', 'kill', 'ps', 'top'
  ].join('|');

  const SQL_KW = [
    'SELECT', 'FROM', 'WHERE', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET',
    'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX', 'VIEW',
    'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'CROSS', 'ON', 'AS',
    'AND', 'OR', 'NOT', 'NULL', 'IS', 'IN', 'LIKE', 'BETWEEN',
    'ORDER', 'BY', 'GROUP', 'HAVING', 'LIMIT', 'OFFSET', 'ASC', 'DESC',
    'DISTINCT', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX', 'COALESCE',
    'PRIMARY', 'KEY', 'FOREIGN', 'REFERENCES', 'CONSTRAINT', 'UNIQUE',
    'DEFAULT', 'CHECK', 'CASCADE', 'AUTO_INCREMENT', 'SERIAL',
    'INT', 'INTEGER', 'VARCHAR', 'TEXT', 'BOOLEAN', 'DATE', 'TIMESTAMP',
    'FLOAT', 'DOUBLE', 'DECIMAL', 'NUMERIC', 'CHAR', 'ENUM', 'JSON',
    'CHARACTER', 'COLLATE', 'UTF8MB4', 'ENGINE', 'InnoDB', 'MyISAM',
    'BEGIN', 'COMMIT', 'ROLLBACK', 'TRANSACTION', 'SAVEPOINT',
    'RETURNING', 'IF', 'EXISTS', 'THEN', 'ELSE', 'END', 'CASE', 'WHEN',
    'UNSIGNED', 'AUTOINCREMENT', 'NOTNULL'
  ].join('|');

  /* ==============================================================
     MOTEURS PAR LANGAGE
     ============================================================== */

  /* Protection anti-double-coloration : découpe le texte selon
     les spans déjà présentes, n'applique la regex QUE sur les
     segments bruts, puis recolle le tout. */
  function _safeHighlight(text, regex, colorFn) {
    var parts = text.split(/(<span class="tk-[^"]*">[^<]*(?:<(?!\/span>)[^<]*)*<\/span>)/g);
    for (var i = 0; i < parts.length; i++) {
      if (i % 2 === 0) parts[i] = parts[i].replace(regex, colorFn);
    }
    return parts.join('');
  }

  /** Noyau commun utilise par JS, TS, et assimiles.
   *  Colorise les commentaires, chaines (simples/doubles/template),
   *  mots-cles, appels de fonction, builtins, et nombres. */
  function highlightCore(escaped, KWS) {
    return _safeHighlight(escaped,
      new RegExp(
        '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                       // commentaires
        '|(\'(?:[^\'\\\\\\n]|\\\\.)*\'|"(?:[^"\\\\\\n]|\\\\.)*"|`(?:[^`\\\\]|\\\\[\\s\\S])*`)' + // chaines
        '|\\b(' + JS_BUILTINS + ')\\b' +                                // objets/APIs built-in
        '|\\b(' + KWS + ')\\b' +                                        // mots-cles
        '|\\b([A-Za-z_$][\\w$]*)(?=\\s*\\()' +                          // appels de fonction  mot(
        '|\\b(\\d[\\d_]*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)\\b',             // nombres
        'g'
      ),
      function (m, com, str, builtin, kw, fn, num) {
        if (com)     return '<span class="tk-com">'  + com + '</span>';
        if (str)     return '<span class="tk-str">'  + str + '</span>';
        if (builtin) return '<span class="tk-val">'  + builtin + '</span>';
        if (kw)      return '<span class="tk-kw">'   + kw + '</span>';
        if (fn)      return '<span class="tk-fn">'   + fn + '</span>';
        if (num)     return '<span class="tk-num">'  + num + '</span>';
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

  /* ----- PHP (pur) ---------------------------------------------- */
  function highlightPHPInner(escaped) {
    return escaped.replace(
      new RegExp(
        '(\\/\\/[^\\n]*|#[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                 // commentaires
        '|(\'(?:[^\'\\\\\\n]|\\\\.)*\'|"(?:[^"\\\\\\n]|\\\\.)*")' +        // chaînes
        '|(\\$[A-Za-z_]\\w*(?:->[A-Za-z_]\\w*)*)' +                       // variables $x, $x->y
        '|\\b(' + PHP_BUILTINS + ')\\b' +                                  // fonctions built-in
        '|\\b(' + PHP_KW + ')\\b' +                                        // mots-clés
        '|\\b([A-Za-z_]\\w*)(?=\\s*\\()' +                                 // appels de fonction
        '|\\b(\\d[\\d_]*(?:\\.\\d+)?)\\b',                                 // nombres
        'g'
      ),
      function (m, com, str, vari, builtin, kw, fn, num) {
        if (com)     return '<span class="tk-com">'  + com + '</span>';
        if (str)     return '<span class="tk-str">'  + str + '</span>';
        if (vari)    return '<span class="tk-prop">' + vari + '</span>';
        if (builtin) return '<span class="tk-fn">'   + builtin + '</span>';
        if (kw)      return '<span class="tk-kw">'   + kw + '</span>';
        if (fn)      return '<span class="tk-fn">'   + fn + '</span>';
        if (num)     return '<span class="tk-num">'  + num + '</span>';
        return m;
      }
    );
  }

  /* ----- PHP (avec mix HTML/PHP) -----------------------------------
     Le code PHP contient très souvent du HTML entremêlé (fichiers
     .php réalistes). Stratégie : découper le texte selon les balises
     &lt;?php et ?&gt;, alterner les modes HTML / PHP, appliquer le
     colorateur approprié à chaque segment.
     Si aucun marqueur PHP n'est présent, tout le bloc est traité
     comme du PHP pur (snippets sans &lt;?php dans les fiches). */
  function highlightPHP(escaped) {
    // Si aucun marqueur PHP n'est présent → PHP pur
    if (!/&lt;\?php|\?&gt;/.test(escaped)) {
      return highlightPHPInner(escaped);
    }

    // Découper sur &lt;?php et ?&gt; (les deux sont des séparateurs)
    var tokens = escaped.split(/(&lt;\?php|\?&gt;)/g);
    var result = '';
    var inPHP = false;  // on commence en mode HTML

    for (var i = 0; i < tokens.length; i++) {
      var tok = tokens[i];
      if (tok === '&lt;?php') {
        result += tok;
        inPHP = true;
      } else if (tok === '?&gt;') {
        result += tok;
        inPHP = false;
      } else if (inPHP) {
        result += highlightPHPInner(tok);
      } else {
        result += highlightHTML(tok);
      }
    }
    return result;
  }

  /* ----- CSS ---------------------------------------------------- */
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

  /* ----- HTML --------------------------------------------------- */
  function highlightHTML(escaped) {
    return escaped.replace(/&lt;!--[\s\S]*?--&gt;|&lt;\/?[a-zA-Z][\s\S]*?(?:&gt;|$)/g, function (m) {
      if (/^&lt;!--/.test(m)) return '<span class="tk-com">' + m + '</span>';
      return m.replace(/(&lt;\/?)([a-zA-Z][\w-]*)|([\w-]+)(=)("[^"]*")/g,
        function (tok, open, tag, attr, eq, val) {
          if (open) return '<span class="tk-tag">' + open + tag + '</span>';
          return '<span class="tk-attr">' + attr + '</span>' + eq + '<span class="tk-str">' + val + '</span>';
        });
    });
  }

  /* ----- XML (même traitement que HTML après échappement) ------- */
  function highlightXML(escaped) {
    return highlightHTML(escaped);
  }

  /* ----- Python ------------------------------------------------- */
  function highlightPython(escaped) {
    return escaped.replace(
      new RegExp(
        '(#[^\\n]*)' +                                                          // commentaires
        '|([fFrRbB]?"""[\\s\\S]*?"""|[fFrRbB]?\'\'\'[\\s\\S]*?\'\'\'|[fFrRbB]?"(?:[^"\\\\\\n]|\\\\.)*"|[fFrRbB]?\'(?:[^\'\\\\\\n]|\\\\.)*\')' + // chaînes (+ triples)
        '|(@[A-Za-z_]\\w*(?:\\.[\\w]+)*)' +                                   // décorateurs @app.route
        '|\\b(' + PY_BUILTINS + ')\\b' +                                       // builtins
        '|\\b(' + PY_KW + ')\\b' +                                             // mots-clés
        '|\\b([A-Za-z_]\\w*)(?=\\s*\\()' +                                     // appels de fonction
        '|\\b(\\d[\\d_]*(?:\\.\\d+)?)\\b',                                     // nombres
        'g'
      ),
      function (m, com, str, dec, builtin, kw, fn, num) {
        if (com)     return '<span class="tk-com">'  + com + '</span>';
        if (str)     return '<span class="tk-str">'  + str + '</span>';
        if (dec)     return '<span class="tk-fn">'   + dec + '</span>';
        if (builtin) return '<span class="tk-val">'  + builtin + '</span>';
        if (kw)      return '<span class="tk-kw">'   + kw + '</span>';
        if (fn)      return '<span class="tk-fn">'   + fn + '</span>';
        if (num)     return '<span class="tk-num">'  + num + '</span>';
        return m;
      }
    );
  }

  /* ----- C ------------------------------------------------------ */
  function highlightC(escaped) {
    return escaped.replace(
      new RegExp(
        '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                 // commentaires
        '|("(?:[^"\\\\\\n]|\\\\.)*")' +                           // chaînes
        '|(\'(?:[^\'\\\\\\n]|\\\\.)*\')' +                         // caractères 'a', '\0'
        '|(^|\\n)([ \\t]*#[^\\n]*)' +                             // préprocesseur (lignes #)
        '|\\b(' + C_KW + ')\\b' +                                 // mots-clés C
        '|\\b(' + C_CONST + ')\\b' +                              // constantes std
        '|\\b(' + C_LIB + ')\\b' +                                // fonctions libc
        '|\\b([A-Za-z_]\\w*)(?=\\s*\\()' +                         // appels de fonction
        '|\\b(0[xX][0-9a-fA-F]+\\b|\\b\\d[\\d_]*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fFuUlL]*\\b)', // nombres
        'g'
      ),
      function (m, com, str, chr, preNl, pre, kw, konst, lib, fn, num) {
        if (com)   return '<span class="tk-com">'  + com + '</span>';
        if (str)   return '<span class="tk-str">'  + str + '</span>';
        if (chr)   return '<span class="tk-str">'  + chr + '</span>';
        if (pre)   return (preNl || '') + '<span class="tk-kw">' + pre + '</span>';
        if (kw)    return '<span class="tk-kw">'   + kw + '</span>';
        if (konst) return '<span class="tk-val">'  + konst + '</span>';
        if (lib)   return '<span class="tk-fn">'   + lib + '</span>';
        if (fn)    return '<span class="tk-fn">'   + fn + '</span>';
        if (num)   return '<span class="tk-num">'  + num + '</span>';
        return m;
      }
    );
  }

  /* ----- Java --------------------------------------------------- */
  function highlightJava(escaped) {
    return escaped.replace(
      new RegExp(
        '(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)' +                 // commentaires
        '|("(?:[^"\\\\\\n]|\\\\.)*")' +                           // chaînes "…"
        '|(\'(?:[^\'\\\\\\n]|\\\\.)*\')' +                         // caractères 'a', '\n'
        '|(@[A-Za-z_]\\w*)' +                                     // annotations @Override
        '|\\b(' + JAVA_KW + ')\\b' +                              // mots-clés
        '|\\b(null|true|false)\\b' +                              // littéraux
        '|\\b(' + JAVA_TYPE + ')\\b' +                            // types & APIs usuels
        '|\\b([A-Za-z_]\\w*)(?=\\s*\\()' +                        // appels de méthodes
        '|\\b(0[xX][0-9a-fA-F_]+\\b|0[bB][01_]+\\b|\\b\\d[\\d_]*(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fFdDlL]*\\b)', // nombres
        'g'
      ),
      function (m, com, str, chr, ann, kw, konst, typ, fn, num) {
        if (com)   return '<span class="tk-com">'  + com + '</span>';
        if (str)   return '<span class="tk-str">'  + str + '</span>';
        if (chr)   return '<span class="tk-str">'  + chr + '</span>';
        if (ann)   return '<span class="tk-attr">' + ann + '</span>';
        if (kw)    return '<span class="tk-kw">'   + kw + '</span>';
        if (konst) return '<span class="tk-val">'  + konst + '</span>';
        if (typ)   return '<span class="tk-val">'  + typ + '</span>';
        if (fn)    return '<span class="tk-fn">'   + fn + '</span>';
        if (num)   return '<span class="tk-num">'  + num + '</span>';
        return m;
      }
    );
  }

  /* ----- Bash / Shell ------------------------------------------- */
  function highlightBash(escaped) {
    return escaped.replace(
      new RegExp(
        '((?:^|\\n)[ \\t]*#[^\\n]*)' +                                     // commentaires de ligne
        '|(\'(?:[^\'\\\\\\n]|\\\\.)*\'|"(?:[^"\\\\\\n]|\\\\.)*")' +      // chaînes
        '|((?:^|\\n)[ \\t]*\\$[ \\t]+[^\\n]*)' +                           // prompt $ commande
        '|(\\$\\{[^}]+\\}|\\$\\([^)]+\\)|\\$[A-Za-z_]\\w*)' +             // ${var} $(cmd) $var
        '|(^|\\n)(\\s*)(\\w+)(\\s*\\(\\s*\\))' +                          // fonction nom() {
        '|\\b(' + BASH_KW + ')\\b' +                                      // mots-clés et commandes
        '|(--?[A-Za-z][A-Za-z0-9-]*(?:=[^\\s,;]+)?)' +                   // --flag --flag=valeur
        '|(\\|+|&&|\\|\\||[<>]{1,2}|;|&)' +                               // opérateurs pipe / redirection
        '|\\b(\\d+)\\b',                                                    // nombres
        'g'
      ),
      function (m, com, str, prompt, vari, fnNl, fnIndent, fnName, fnParens, kw, flag, op, num) {
        if (com)     return '<span class="tk-com">'  + com + '</span>';
        if (str)     return '<span class="tk-str">'  + str + '</span>';
        if (prompt)  return '<span class="tk-val">'  + prompt + '</span>';
        if (vari)    return '<span class="tk-prop">' + vari + '</span>';
        if (fnName)  return (fnNl || '') + fnIndent + '<span class="tk-fn">' + fnName + '</span>' + fnParens;
        if (kw)      return '<span class="tk-kw">'   + kw + '</span>';
        if (flag)    return '<span class="tk-attr">' + flag + '</span>';
        if (op)      return '<span class="tk-kw">'   + op + '</span>';
        if (num)     return '<span class="tk-num">'  + num + '</span>';
        return m;
      }
    );
  }

  /* ----- SQL ---------------------------------------------------- */
  function highlightSQL(escaped) {
    return escaped.replace(
      new RegExp(
        '(--[^\\n]*)' +                                                      // commentaires --
        '|(\'(?:[^\'\\\\\\n]|\\\\.)*\')' +                                  // chaînes '…'
        '|\\b(' + SQL_KW + ')\\b' +                                        // mots-clés SQL (majuscules dans la liste)
        '|\\b(\\d+(?:\\.\\d+)?)\\b',                                        // nombres
        'g'
      ),
      function (m, com, str, kw, num) {
        if (com) return '<span class="tk-com">' + com + '</span>';
        if (str) return '<span class="tk-str">' + str + '</span>';
        if (kw)  return '<span class="tk-kw">'  + kw + '</span>';
        if (num) return '<span class="tk-num">' + num + '</span>';
        return m;
      }
    );
  }

  /* ----- Fallback universel (tous langages inconnus) -------------
     Colorise au minimum les commentaires (slash-slash, hash, slash-étoile)
     et les chaînes de caractères (simples et doubles). Cela évite le rendu
     entièrement monochrome sur bash, xml, text, etc. */
  function highlightFallback(escaped) {
    return escaped.replace(
      /(\/\/[^\n]*|#[^\n]*|\/\*[\s\S]*?\*\/)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*")/g,
      function (m, com, str) {
        if (com) return '<span class="tk-com">' + com + '</span>';
        if (str) return '<span class="tk-str">' + str + '</span>';
        return m;
      }
    );
  }

  /* ==============================================================
     API PUBLIQUE
     ============================================================== */
  /* ----- JSX (coloration des balises dans le JS/TS) ----------
     Appliquee AVANT la coloration JS standard pour que les
     attributs soient encore visibles (pas encore encapsules
     dans des spans tk-str). La coloration JS est appliquee
     APRES, pour colorer les expressions dans les {}. */
  function highlightJSX(escaped) {
    var JSX_TAGS = /^(div|span|p|a|img|ul|ol|li|h[1-6]|section|article|nav|header|footer|main|aside|button|input|form|label|select|option|textarea|table|tr|td|th|thead|tbody|br|hr|strong|em|code|pre|small|i|b|u|s|sub|sup|details|summary|Fragment|Suspense|KeepAlive|Transition|TransitionGroup|RouterLink|RouterView|Teleport|component|slot|template)$/;

    return escaped.replace(
      /&lt;(\/?)([A-Za-z][\w.-]*)((?:\s[^&]*(?:\{[^}]*\}|"[^"]*"|'[^']*'))*\s*)\/?&gt;/g,
      function (fullMatch, slash, tagName, attrs) {
        var isJSX = /^[A-Z]/.test(tagName) || JSX_TAGS.test(tagName);
        if (!isJSX) return fullMatch;

        // Colorer les attributs
        var coloredAttrs = attrs.replace(
          /([A-Za-z_$][\w$]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\}))?/g,
          function (aMatch, aName, dqV, sqV, brV) {
            var out = '<span class="tk-attr">' + aName + '</span>';
            var val = dqV || sqV || brV;
            if (val !== undefined) {
              var opener = brV ? '{' : (dqV ? '"' : "'");
              var closer = brV ? '}' : (dqV ? '"' : "'");
              // Les valeurs {expr} restent brutes pour que highlightJS les colore.
              // Seules les valeurs "string" ou 'string' sont wrapées dans tk-str.
              if (brV) {
                // {expr} : accolades brutes, contenu libre pour JS
                out += '={' + val + '}';
              } else {
                // "str" ou 'str' : protege dans tk-str
                out += '=<span class="tk-str">' + opener + val + closer + '</span>';
              }
            }
            return out;
          }
        );

        var selfClose = /\/$/.test(attrs) ? '/' : '';
        return '<span class="tk-tag">&lt;' + slash + tagName + '</span>'
             + coloredAttrs
             + '<span class="tk-tag">' + selfClose + '&gt;</span>';
      }
    );
  }

  window.High = {
    esc: esc,
    /** Colorise du code BRUT selon le langage. */
    run: function (code, lang) {
      var escaped = esc(code);
      // JS/TS : JSX d'abord, coloration JS ensuite (colore les expressions dans les {})
      if (lang === 'js' || lang === 'javascript')   return highlightJS(highlightJSX(escaped));
      if (lang === 'ts' || lang === 'typescript')   return highlightTS(highlightJSX(escaped));
      if (lang === 'jsx')                           return highlightJS(highlightJSX(escaped));
      if (lang === 'php')                           return highlightPHP(escaped);
      if (lang === 'py' || lang === 'python')       return highlightPython(escaped);
      if (lang === 'c' || lang === 'cpp')           return highlightC(escaped);
      if (lang === 'java' || lang === 'kotlin')     return highlightJava(escaped);
      if (lang === 'css')                           return highlightCSS(escaped);
      if (lang === 'html' || lang === 'svg')        return highlightHTML(escaped);
      if (lang === 'xml')                           return highlightXML(escaped);
      if (lang === 'bash' || lang === 'sh' || lang === 'shell') return highlightBash(escaped);
      if (lang === 'sql')                           return highlightSQL(escaped);
      if (lang === 'text' || lang === 'txt' || lang === 'plaintext') return escaped;
      /* Fallback pour tout langage inconnu : au moins les commentaires et chaînes */
      return highlightFallback(escaped);
    }
  };
})();
