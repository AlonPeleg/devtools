(function () {
  var S = window.DT_LANG_SAMPLES = window.DT_LANG_SAMPLES || {};

  var rp1_NOUNS = ['order', 'user', 'invoice', 'ticket', 'product', 'session', 'account', 'report', 'device', 'message'];
  var rp1_WORDS = ['alpha', 'bravo', 'cedar', 'delta', 'ember', 'fjord', 'gamma', 'harbor', 'iris', 'juniper'];
  function rp1_pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function rp1_int(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function rp1_vars(i) {
    var n = rp1_pick(rp1_NOUNS);
    return { I: i, n: n, N: n.charAt(0).toUpperCase() + n.slice(1), W: rp1_pick(rp1_WORDS), X: rp1_int(2, 90), Y: rp1_int(100, 999) };
  }
  function rp1_fill(lines, v) {
    return lines.join('\n').replace(/\{\{(\w+)\}\}/g, function (m, k) { return String(v[k]); });
  }

  /* ---------------------------------------------------------- typescript */
  S.typescript = {
    short: [
      [
        '// A typed user model with a helper',
        'interface User {',
        '  id: number;',
        '  name: string;',
        '  email?: string;',
        '  roles: ReadonlyArray<"admin" | "editor" | "viewer">;',
        '}',
        '',
        'function describe(user: User): string {',
        '  const mail = user.email ?? "no email";',
        '  const isAdmin = user.roles.includes("admin");',
        '  return `${user.name} <${mail}>${isAdmin ? " [admin]" : ""}`;',
        '}',
        '',
        'const users: User[] = [',
        '  { id: 1, name: "Ada", roles: ["admin"] },',
        '  { id: 2, name: "Linus", email: "l@example.com", roles: ["editor", "viewer"] },',
        '];',
        'users.forEach((u) => console.log(describe(u)));'
      ].join('\n'),
      [
        '// Generic binary search over a sorted array',
        'export function binarySearch<T>(',
        '  items: T[],',
        '  target: T,',
        '  compare: (a: T, b: T) => number',
        '): number {',
        '  let lo = 0;',
        '  let hi = items.length - 1;',
        '  while (lo <= hi) {',
        '    const mid = Math.floor((lo + hi) / 2);',
        '    const cmp = compare(items[mid], target);',
        '    if (cmp === 0) return mid;',
        '    if (cmp < 0) lo = mid + 1;',
        '    else hi = mid - 1;',
        '  }',
        '  return -1;',
        '}',
        '',
        'console.log(binarySearch([1, 3, 5, 7, 9], 7, (a, b) => a - b));'
      ].join('\n'),
      [
        'type Todo = { id: number; title: string; completed: boolean };',
        '',
        'async function fetchTodos(limit = 5): Promise<Todo[]> {',
        '  const url = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`;',
        '  try {',
        '    const res = await fetch(url);',
        '    if (!res.ok) {',
        '      throw new Error(`HTTP ${res.status}`);',
        '    }',
        '    return (await res.json()) as Todo[];',
        '  } catch (err) {',
        '    console.error("Failed to load todos:", err);',
        '    return [];',
        '  }',
        '}',
        '',
        'fetchTodos(3).then((todos) => {',
        '  for (const t of todos) console.log(t.completed ? "[x]" : "[ ]", t.title);',
        '});'
      ].join('\n'),
      [
        'enum Level {',
        '  Debug = 10,',
        '  Info = 20,',
        '  Error = 40,',
        '}',
        '',
        'class Logger {',
        '  constructor(private readonly prefix: string, private min: Level = Level.Info) {}',
        '',
        '  log(level: Level, message: string): void {',
        '    if (level < this.min) return; // filtered out',
        '    const stamp = new Date().toISOString();',
        '    console.log(`[${stamp}] ${this.prefix} ${Level[level]}: ${message}`);',
        '  }',
        '}',
        '',
        'const logger = new Logger("app");',
        'logger.log(Level.Debug, "hidden");',
        'logger.log(Level.Error, "something broke");'
      ].join('\n')
    ],
    long: [
      function () {
        var out = ['// Generated data access layer', 'export type Id = number;', ''];
        var cnt = rp1_int(16, 20);
        for (var i = 1; i <= cnt; i++) {
          out.push(rp1_fill([
            'export interface {{N}}{{I}} {',
            '  id: number;',
            '  label: string;',
            '  amount: number;',
            '  tags: string[];',
            '}',
            '',
            'export function load{{N}}{{I}}(id: number): {{N}}{{I}} {',
            '  // fetch record {{I}} for {{W}}',
            '  return { id: id, label: "{{W}}-{{I}}", amount: {{X}}, tags: ["{{W}}", "{{n}}"] };',
            '}',
            ''
          ], rp1_vars(i)));
        }
        out.push('export const generatedCount: number = ' + cnt + ';');
        return out.join('\n');
      },
      function () {
        var out = ['// Cache models with self-checks', ''];
        var cnt = rp1_int(10, 12);
        for (var i = 1; i <= cnt; i++) {
          out.push(rp1_fill([
            'export class {{N}}Cache{{I}} {',
            '  private items: Map<string, number> = new Map();',
            '  constructor(private readonly limit: number = {{X}}) {}',
            '',
            '  put(key: string, value: number): void {',
            '    if (this.items.size >= this.limit) {',
            '      const first = this.items.keys().next().value as string;',
            '      this.items.delete(first);',
            '    }',
            '    this.items.set(key, value);',
            '  }',
            '',
            '  get(key: string): number | undefined {',
            '    return this.items.get(key);',
            '  }',
            '}',
            '',
            'function test{{N}}Cache{{I}}(): void {',
            '  const c = new {{N}}Cache{{I}}(2);',
            '  c.put("{{W}}", {{X}});',
            '  console.assert(c.get("{{W}}") === {{X}}, "{{n}}{{I}} get");',
            '}',
            ''
          ], rp1_vars(i)));
        }
        return out.join('\n');
      }
    ]
  };

  /* ---------------------------------------------------------- javascript */
  S.javascript = {
    short: [
      [
        '// Small debounce utility',
        'function debounce(fn, wait = 200) {',
        '  let timer = null;',
        '  return function (...args) {',
        '    clearTimeout(timer);',
        '    timer = setTimeout(() => fn.apply(this, args), wait);',
        '  };',
        '}',
        '',
        'const input = document.querySelector("#search");',
        'const onType = debounce((event) => {',
        '  console.log("Searching for:", event.target.value);',
        '}, 300);',
        'input.addEventListener("input", onType);'
      ].join('\n'),
      [
        'class Counter {',
        '  #count = 0;',
        '',
        '  constructor(step = 1) {',
        '    this.step = step;',
        '  }',
        '',
        '  increment() {',
        '    this.#count += this.step;',
        '    return this;',
        '  }',
        '',
        '  get value() {',
        '    return this.#count;',
        '  }',
        '}',
        '',
        'const c = new Counter(5).increment().increment();',
        'console.log(`Counter is now ${c.value}`);'
      ].join('\n'),
      [
        '// Fetch JSON with retries',
        'async function getJson(url, retries = 3) {',
        '  for (let attempt = 1; attempt <= retries; attempt++) {',
        '    try {',
        '      const response = await fetch(url);',
        '      if (!response.ok) throw new Error("Status " + response.status);',
        '      return await response.json();',
        '    } catch (err) {',
        '      console.warn(`Attempt ${attempt} failed: ${err.message}`);',
        '      if (attempt === retries) throw err;',
        '      await new Promise((r) => setTimeout(r, 100 * attempt));',
        '    }',
        '  }',
        '}',
        '',
        'getJson("/api/items").then((items) => console.log(items.length));'
      ].join('\n'),
      [
        'const orders = [',
        '  { id: 1, customer: "ann", total: 42.5, paid: true },',
        '  { id: 2, customer: "bob", total: 13.0, paid: false },',
        '  { id: 3, customer: "ann", total: 99.9, paid: true },',
        '];',
        '',
        '// Group totals by customer',
        'const totals = orders',
        '  .filter((o) => o.paid)',
        '  .reduce((acc, o) => {',
        '    acc[o.customer] = (acc[o.customer] || 0) + o.total;',
        '    return acc;',
        '  }, {});',
        '',
        'for (const [name, sum] of Object.entries(totals)) {',
        '  console.log(name.padEnd(6), sum.toFixed(2));',
        '}'
      ].join('\n')
    ],
    long: [
      function () {
        var out = ['"use strict";', '// Generated API client', ''];
        var cnt = rp1_int(14, 18);
        for (var i = 1; i <= cnt; i++) {
          out.push(rp1_fill([
            '/**',
            ' * Loads {{n}} number {{I}} from the store.',
            ' * @param {number} id',
            ' * @returns {Promise<object>}',
            ' */',
            'async function load{{N}}{{I}}(id) {',
            '  const res = await fetch("/api/{{n}}s/" + id + "?rev={{X}}");',
            '  if (!res.ok) {',
            '    throw new Error("{{W}} failed for {{n}}{{I}}: " + res.status);',
            '  }',
            '  return res.json();',
            '}',
            ''
          ], rp1_vars(i)));
        }
        out.push('module.exports = { count: ' + cnt + ' };');
        return out.join('\n');
      },
      function () {
        var out = [
          '"use strict";',
          'const assert = require("assert");',
          '',
          'function test(name, fn) {',
          '  try {',
          '    fn();',
          '    console.log("ok - " + name);',
          '  } catch (e) {',
          '    console.error("not ok - " + name, e.message);',
          '  }',
          '}',
          ''
        ];
        var cnt = rp1_int(11, 14);
        for (var i = 1; i <= cnt; i++) {
          out.push(rp1_fill([
            'class {{N}}{{I}} {',
            '  constructor(name, qty = {{X}}) {',
            '    this.name = name;',
            '    this.qty = qty;',
            '  }',
            '',
            '  total(price) {',
            '    return this.qty * price;',
            '  }',
            '',
            '  label() {',
            '    return `{{W}}-${this.name}-{{I}}`;',
            '  }',
            '}',
            '',
            'test("{{n}}{{I}} total", () => {',
            '  const item = new {{N}}{{I}}("{{W}}", {{X}});',
            '  assert.strictEqual(item.total(2), {{X}} * 2);',
            '});',
            ''
          ], rp1_vars(i)));
        }
        return out.join('\n');
      }
    ]
  };

  /* ---------------------------------------------------------------- java */
  S.java = {
    short: [
      [
        'import java.util.Objects;',
        '',
        '/** Immutable 2D point. */',
        'public final class Point {',
        '    private final int x;',
        '    private final int y;',
        '',
        '    public Point(int x, int y) {',
        '        this.x = x;',
        '        this.y = y;',
        '    }',
        '',
        '    @Override',
        '    public boolean equals(Object o) {',
        '        if (this == o) return true;',
        '        if (!(o instanceof Point)) return false;',
        '        Point p = (Point) o;',
        '        return x == p.x && y == p.y;',
        '    }',
        '',
        '    @Override',
        '    public int hashCode() { return Objects.hash(x, y); }',
        '}'
      ].join('\n'),
      [
        'public class Search {',
        '    // Returns the index of target, or -1 when missing',
        '    public static int binarySearch(int[] data, int target) {',
        '        int lo = 0, hi = data.length - 1;',
        '        while (lo <= hi) {',
        '            int mid = (lo + hi) >>> 1;',
        '            if (data[mid] == target) return mid;',
        '            if (data[mid] < target) lo = mid + 1;',
        '            else hi = mid - 1;',
        '        }',
        '        return -1;',
        '    }',
        '',
        '    public static void main(String[] args) {',
        '        int[] values = {2, 4, 8, 16, 32};',
        '        System.out.println("Found at " + binarySearch(values, 16));',
        '    }',
        '}'
      ].join('\n'),
      [
        'import java.net.URI;',
        'import java.net.http.HttpClient;',
        'import java.net.http.HttpRequest;',
        'import java.net.http.HttpResponse;',
        '',
        'public class Fetcher {',
        '    public static void main(String[] args) throws Exception {',
        '        HttpClient client = HttpClient.newHttpClient();',
        '        HttpRequest request = HttpRequest.newBuilder()',
        '                .uri(URI.create("https://example.com/api/status"))',
        '                .header("Accept", "application/json")',
        '                .GET()',
        '                .build();',
        '        HttpResponse<String> response =',
        '                client.send(request, HttpResponse.BodyHandlers.ofString());',
        '        System.out.println(response.statusCode());',
        '        System.out.println(response.body());',
        '    }',
        '}'
      ].join('\n'),
      [
        'import java.util.*;',
        'import java.util.stream.Collectors;',
        '',
        'public class WordCount {',
        '    public static void main(String[] args) {',
        '        String text = "the quick brown fox jumps over the lazy dog the end";',
        '        Map<String, Long> counts = Arrays.stream(text.split(" "))',
        '                .collect(Collectors.groupingBy(w -> w, TreeMap::new, Collectors.counting()));',
        '        counts.forEach((word, n) -> {',
        '            if (n > 1) {',
        '                System.out.printf("%s appears %d times%n", word, n);',
        '            }',
        '        });',
        '    }',
        '}'
      ].join('\n')
    ],
    long: [
      function () {
        var out = [
          'import java.util.HashMap;',
          'import java.util.Map;',
          '',
          '/** Generated repository with lookup methods. */',
          'public class RpRepository {',
          '    private final Map<String, Integer> cache = new HashMap<>();',
          ''
        ];
        var cnt = rp1_int(14, 18);
        for (var i = 1; i <= cnt; i++) {
          out.push(rp1_fill([
            '    record {{N}}{{I}}Dto(long id, String key, int score) {}',
            '',
            '    /** Finds {{n}} by id, variant {{I}}. */',
            '    public {{N}}{{I}}Dto find{{N}}{{I}}(long id) {',
            '        if (id <= 0) {',
            '            throw new IllegalArgumentException("bad id for {{n}}{{I}}");',
            '        }',
            '        String key = "{{W}}:" + id;',
            '        Integer hit = cache.get(key);',
            '        int score = hit == null ? {{X}} : hit;',
            '        cache.put(key, score + {{I}});',
            '        return new {{N}}{{I}}Dto(id, key, score);',
            '    }',
            ''
          ], rp1_vars(i)));
        }
        out.push('}');
        return out.join('\n');
      },
      function () {
        var out = ['// Generated model classes and checks', ''];
        var tests = [
          'public class RpModels {',
          '    static void check(boolean cond, String msg) {',
          '        if (!cond) throw new AssertionError(msg);',
          '    }',
          ''
        ];
        var cnt = rp1_int(10, 12);
        for (var i = 1; i <= cnt; i++) {
          var v = rp1_vars(i);
          out.push(rp1_fill([
            'class {{N}}{{I}} {',
            '    private final String name;',
            '    private int count;',
            '',
            '    {{N}}{{I}}(String name, int count) {',
            '        this.name = name;',
            '        this.count = count;',
            '    }',
            '',
            '    String getName() { return name; }',
            '    int getCount() { return count; }',
            '    void bump() { count += {{X}}; }',
            '',
            '    @Override',
            '    public String toString() {',
            '        return "{{N}}{{I}}[" + name + "," + count + "]";',
            '    }',
            '}',
            ''
          ], v));
          tests.push(rp1_fill([
            '    static void test{{N}}{{I}}() {',
            '        {{N}}{{I}} item = new {{N}}{{I}}("{{W}}", 1);',
            '        item.bump();',
            '        check(item.getCount() == 1 + {{X}}, "{{n}}{{I}} bump");',
            '    }',
            ''
          ], v));
        }
        tests.push('    public static void main(String[] args) {');
        tests.push('        System.out.println("running " + ' + cnt + ' + " checks");');
        tests.push('    }');
        tests.push('}');
        return out.join('\n') + '\n' + tests.join('\n');
      }
    ]
  };

  /* -------------------------------------------------------------- csharp */
  S.csharp = {
    short: [
      [
        'using System;',
        '',
        'namespace Shop.Models',
        '{',
        '    public record Product(string Name, decimal Price, int Stock)',
        '    {',
        '        public bool InStock => Stock > 0;',
        '',
        '        public decimal WithTax(decimal rate = 0.2m) => Math.Round(Price * (1 + rate), 2);',
        '    }',
        '',
        '    public static class Demo',
        '    {',
        '        public static void Main()',
        '        {',
        '            var p = new Product("Lamp", 19.99m, 3);',
        '            Console.WriteLine($"{p.Name}: {p.WithTax()} (in stock: {p.InStock})");',
        '        }',
        '    }',
        '}'
      ].join('\n'),
      [
        'using System;',
        'using System.Collections.Generic;',
        'using System.Linq;',
        '',
        'var people = new List<(string Name, int Age)>',
        '{',
        '    ("Ana", 31), ("Ben", 17), ("Cy", 45), ("Dee", 22)',
        '};',
        '',
        '// Adults sorted by age, descending',
        'var adults = people',
        '    .Where(p => p.Age >= 18)',
        '    .OrderByDescending(p => p.Age)',
        '    .Select(p => $"{p.Name} ({p.Age})");',
        '',
        'Console.WriteLine(string.Join(", ", adults));'
      ].join('\n'),
      [
        'using System;',
        'using System.Net.Http;',
        'using System.Threading.Tasks;',
        '',
        'public class Downloader',
        '{',
        '    private static readonly HttpClient Client = new HttpClient();',
        '',
        '    public static async Task<int> CountBytesAsync(string url)',
        '    {',
        '        try',
        '        {',
        '            string body = await Client.GetStringAsync(url);',
        '            return body.Length;',
        '        }',
        '        catch (HttpRequestException ex)',
        '        {',
        '            Console.Error.WriteLine("Request failed: " + ex.Message);',
        '            return -1;',
        '        }',
        '    }',
        '}'
      ].join('\n'),
      [
        'using System;',
        'using System.Collections.Generic;',
        '',
        '// Generic fixed-size ring buffer',
        'public class RingBuffer<T>',
        '{',
        '    private readonly T[] _items;',
        '    private int _head;',
        '    private int _count;',
        '',
        '    public RingBuffer(int capacity) => _items = new T[capacity];',
        '',
        '    public void Add(T item)',
        '    {',
        '        _items[(_head + _count) % _items.Length] = item;',
        '        if (_count < _items.Length) _count++;',
        '        else _head = (_head + 1) % _items.Length;',
        '    }',
        '',
        '    public int Count => _count;',
        '}'
      ].join('\n')
    ],
    long: [
      function () {
        var out = [
          'using System;',
          'using System.Threading.Tasks;',
          '',
          'namespace Rp.Services',
          '{',
          '    public class GeneratedService',
          '    {'
        ];
        var cnt = rp1_int(15, 19);
        for (var i = 1; i <= cnt; i++) {
          out.push(rp1_fill([
            '',
            '        /// <summary>Loads {{n}} number {{I}}.</summary>',
            '        public async Task<string> Load{{N}}{{I}}Async(int id)',
            '        {',
            '            if (id < 0)',
            '            {',
            '                throw new ArgumentOutOfRangeException(nameof(id), "{{W}} id");',
            '            }',
            '            await Task.Delay({{X}});',
            '            var key = "{{n}}-" + id + "-{{I}}";',
            '            return key;',
            '        }'
          ], rp1_vars(i)));
        }
        out.push('    }');
        out.push('}');
        return out.join('\n');
      },
      function () {
        var out = ['using System;', '', 'namespace Rp.Models', '{'];
        var tests = ['    public static class Checks', '    {', '        static void Assert(bool cond, string msg)', '        {', '            if (!cond) throw new Exception(msg);', '        }', ''];
        var cnt = rp1_int(9, 11);
        for (var i = 1; i <= cnt; i++) {
          var v = rp1_vars(i);
          out.push(rp1_fill([
            '    public class {{N}}{{I}}',
            '    {',
            '        public string Name { get; set; } = "{{W}}";',
            '        public int Count { get; set; } = {{X}};',
            '        public decimal Price { get; set; } = {{Y}}m;',
            '',
            '        public decimal Total() => Count * Price;',
            '',
            '        public override string ToString()',
            '        {',
            '            return Name + "#{{I}}:" + Count;',
            '        }',
            '    }',
            ''
          ], v));
          tests.push(rp1_fill([
            '        public static void Test{{N}}{{I}}()',
            '        {',
            '            var x = new {{N}}{{I}}();',
            '            x.Count += {{I}};',
            '            Assert(x.Total() == x.Count * x.Price, "{{n}}{{I}} total");',
            '        }',
            ''
          ], v));
        }
        tests.push('    }');
        return out.join('\n') + '\n' + tests.join('\n') + '\n}';
      }
    ]
  };

  /* -------------------------------------------------------------- python */
  S.python = {
    short: [
      [
        'from dataclasses import dataclass, field',
        'from typing import List',
        '',
        '',
        '@dataclass',
        'class Student:',
        '    name: str',
        '    grades: List[int] = field(default_factory=list)',
        '',
        '    def average(self) -> float:',
        '        """Return the mean grade, or 0.0 if none."""',
        '        return sum(self.grades) / len(self.grades) if self.grades else 0.0',
        '',
        '',
        'ann = Student("Ann", [90, 85, 77])',
        'print(f"{ann.name}: {ann.average():.1f}")'
      ].join('\n'),
      [
        'from functools import lru_cache',
        '',
        '',
        '@lru_cache(maxsize=None)',
        'def fib(n: int) -> int:',
        '    """Memoised Fibonacci."""',
        '    if n < 2:',
        '        return n',
        '    return fib(n - 1) + fib(n - 2)',
        '',
        '',
        'def primes(limit):',
        '    sieve = [True] * (limit + 1)',
        '    for i in range(2, int(limit ** 0.5) + 1):',
        '        if sieve[i]:',
        '            for j in range(i * i, limit + 1, i):',
        '                sieve[j] = False',
        '    return [i for i in range(2, limit + 1) if sieve[i]]',
        '',
        'print(fib(30), primes(30))'
      ].join('\n'),
      [
        'import asyncio',
        'import random',
        '',
        '',
        'async def worker(name: str, queue: asyncio.Queue) -> None:',
        '    while True:',
        '        job = await queue.get()',
        '        await asyncio.sleep(random.random() / 10)',
        '        print(f"{name} finished job {job}")',
        '        queue.task_done()',
        '',
        '',
        'async def main():',
        '    queue = asyncio.Queue()',
        '    for job in range(6):',
        '        queue.put_nowait(job)',
        '    tasks = [asyncio.create_task(worker(f"w{i}", queue)) for i in range(2)]',
        '    await queue.join()',
        '    for t in tasks:',
        '        t.cancel()',
        '',
        'asyncio.run(main())'
      ].join('\n'),
      [
        'import json',
        'from pathlib import Path',
        '',
        '',
        'def load_config(path, defaults=None):',
        '    """Load JSON config, falling back to defaults."""',
        '    config = dict(defaults or {})',
        '    file = Path(path)',
        '    if file.exists():',
        '        with file.open("r", encoding="utf-8") as fh:',
        '            config.update(json.load(fh))',
        '    else:',
        '        print("config missing, using defaults")',
        '    return config',
        '',
        '',
        'if __name__ == "__main__":',
        '    cfg = load_config("settings.json", {"debug": False, "retries": 3})',
        '    print(cfg)'
      ].join('\n')
    ],
    long: [
      function () {
        var out = ['"""Generated lookup helpers."""', ''];
        var cnt = rp1_int(18, 22);
        for (var i = 1; i <= cnt; i++) {
          out.push(rp1_fill([
            '',
            '',
            'def load_{{n}}_{{I}}(store, key):',
            '    """Load {{n}} record {{I}} from the store."""',
            '    if key not in store:',
            '        raise KeyError("{{W}} missing: " + key)',
            '    value = store[key]',
            '    if value < {{X}}:',
            '        return value * {{I}}',
            '    return value - {{X}}'
          ], rp1_vars(i)));
        }
        out.push('');
        return out.join('\n');
      },
      function () {
        var out = ['import unittest', 'from dataclasses import dataclass', ''];
        var cnt = rp1_int(10, 12);
        for (var i = 1; i <= cnt; i++) {
          out.push(rp1_fill([
            '',
            '@dataclass',
            'class {{N}}{{I}}:',
            '    name: str = "{{W}}"',
            '    count: int = {{X}}',
            '    price: float = {{Y}}.5',
            '',
            '    def total(self) -> float:',
            '        return self.count * self.price',
            '',
            '    def bump(self, step: int = {{I}}) -> None:',
            '        self.count += step',
            '',
            '',
            'class Test{{N}}{{I}}(unittest.TestCase):',
            '    def test_total(self):',
            '        item = {{N}}{{I}}()',
            '        self.assertEqual(item.total(), item.count * item.price)',
            ''
          ], rp1_vars(i)));
        }
        out.push('');
        out.push('if __name__ == "__main__":');
        out.push('    unittest.main()');
        return out.join('\n');
      }
    ]
  };

  /* --------------------------------------------------------- objectscript */
  S.objectscript = {
    short: [
      [
        'Class Demo.Person Extends %Persistent',
        '{',
        '',
        'Property Name As %String(MAXLEN = 100) [ Required ];',
        '',
        'Property Age As %Integer(MINVAL = 0);',
        '',
        'Index NameIdx On Name;',
        '',
        '/// Creates and saves a person',
        'ClassMethod Add(name As %String, age As %Integer) As %Status',
        '{',
        '    set person = ##class(Demo.Person).%New()',
        '    set person.Name = name',
        '    set person.Age = age',
        '    quit person.%Save()',
        '}',
        '',
        '}'
      ].join('\n'),
      [
        'Class Demo.Utils Extends %RegisteredObject',
        '{',
        '',
        '/// Walks a global and prints every subscript',
        'ClassMethod Dump() As %Status',
        '{',
        '    set key = ""',
        '    for {',
        '        set key = $order(^Demo.Data(key), 1, value)',
        '        quit:key=""',
        '        write key, " = ", value, !',
        '    }',
        '    quit $$$OK',
        '}',
        '',
        '}'
      ].join('\n'),
      [
        'Class Demo.Safe Extends %RegisteredObject',
        '{',
        '',
        'ClassMethod Divide(a As %Numeric, b As %Numeric) As %Numeric',
        '{',
        '    try {',
        '        if b = 0 {',
        '            throw ##class(%Exception.General).%New("DivZero", 5001, , "Division by zero")',
        '        }',
        '        quit a / b',
        '    } catch ex {',
        '        write "Error: ", ex.DisplayString(), !',
        '        quit 0',
        '    }',
        '}',
        '',
        '}'
      ].join('\n'),
      [
        'Class Demo.Report Extends %RegisteredObject',
        '{',
        '',
        '/// Lists people older than the given age using embedded SQL',
        'ClassMethod Older(minAge As %Integer = 30) As %Status',
        '{',
        '    &sql(DECLARE C1 CURSOR FOR SELECT Name, Age INTO :name, :age',
        '         FROM Demo.Person WHERE Age > :minAge ORDER BY Age)',
        '    &sql(OPEN C1)',
        '    for {',
        '        &sql(FETCH C1)',
        '        quit:SQLCODE\'=0',
        '        write name, " (", age, ")", !',
        '    }',
        '    &sql(CLOSE C1)',
        '    quit $$$OK',
        '}',
        '',
        '}'
      ].join('\n')
    ],
    long: [
      function () {
        var out = [
          '/// Generated scoring service',
          'Class Rp.Service' + rp1_int(1, 99) + ' Extends %RegisteredObject',
          '{',
          ''
        ];
        var cnt = rp1_int(13, 17);
        for (var i = 1; i <= cnt; i++) {
          out.push(rp1_fill([
            '/// Computes the {{n}} score, variant {{I}}.',
            'ClassMethod Score{{N}}{{I}}(id As %Integer) As %Integer',
            '{',
            '    set total = 0',
            '    for i = 1:1:{{X}} {',
            '        set total = total + (id * i)',
            '    }',
            '    if total > {{Y}} {',
            '        write "{{W}} overflow ", total, !',
            '    }',
            '    quit total',
            '}',
            ''
          ], rp1_vars(i)));
        }
        out.push('}');
        return out.join('\n');
      },
      function () {
        var out = ['/// Generated persistent classes', ''];
        var cnt = rp1_int(8, 10);
        for (var i = 1; i <= cnt; i++) {
          out.push(rp1_fill([
            'Class Rp.{{N}}{{I}} Extends %Persistent',
            '{',
            '',
            'Property Name As %String(MAXLEN = 80) [ Required ];',
            '',
            'Property Amount As %Numeric(SCALE = 2) [ InitialExpression = {{X}} ];',
            '',
            'Index NameIdx On Name;',
            '',
            '/// Creates and saves a {{n}} record.',
            'ClassMethod Create(name As %String) As %Status',
            '{',
            '    set obj = ..%New()',
            '    set obj.Name = name',
            '    set sc = obj.%Save()',
            '    if $$$ISERR(sc) {',
            '        do $system.Status.DisplayError(sc)',
            '    }',
            '    quit sc',
            '}',
            '',
            'Method Describe() As %String',
            '{',
            '    quit "{{W}}:" _ ..Name _ ":" _ ..Amount',
            '}',
            '',
            '}',
            ''
          ], rp1_vars(i)));
        }
        return out.join('\n');
      }
    ]
  };

  /* ----------------------------------------------------------------- cpp */
  S.cpp = {
    short: [
      [
        '#include <iostream>',
        '#include <string>',
        '',
        'struct Point {',
        '    double x = 0.0;',
        '    double y = 0.0;',
        '',
        '    Point operator+(const Point& o) const { return {x + o.x, y + o.y}; }',
        '};',
        '',
        'std::ostream& operator<<(std::ostream& os, const Point& p) {',
        '    return os << "(" << p.x << ", " << p.y << ")";',
        '}',
        '',
        'int main() {',
        '    Point a{1.5, 2.0}, b{0.5, -1.0};',
        '    std::cout << "Sum: " << (a + b) << std::endl;',
        '    return 0;',
        '}'
      ].join('\n'),
      [
        '#include <iostream>',
        '#include <vector>',
        '#include <utility>',
        '',
        '// Simple in-place quicksort for any comparable type',
        'template <typename T>',
        'void quicksort(std::vector<T>& v, int lo, int hi) {',
        '    if (lo >= hi) return;',
        '    T pivot = v[(lo + hi) / 2];',
        '    int i = lo, j = hi;',
        '    while (i <= j) {',
        '        while (v[i] < pivot) ++i;',
        '        while (v[j] > pivot) --j;',
        '        if (i <= j) std::swap(v[i++], v[j--]);',
        '    }',
        '    quicksort(v, lo, j);',
        '    quicksort(v, i, hi);',
        '}'
      ].join('\n'),
      [
        '#include <fstream>',
        '#include <iostream>',
        '#include <sstream>',
        '#include <string>',
        '',
        'int countLines(const std::string& path) {',
        '    std::ifstream in(path);',
        '    if (!in.is_open()) {',
        '        std::cerr << "cannot open " << path << std::endl;',
        '        return -1;',
        '    }',
        '    std::string line;',
        '    int count = 0;',
        '    while (std::getline(in, line)) {',
        '        if (!line.empty() && line[0] != \'#\') ++count;',
        '    }',
        '    return count;',
        '}'
      ].join('\n'),
      [
        '#include <algorithm>',
        '#include <iostream>',
        '#include <memory>',
        '#include <vector>',
        '',
        'class Shape {',
        'public:',
        '    virtual ~Shape() = default;',
        '    virtual double area() const = 0;',
        '};',
        '',
        'class Circle : public Shape {',
        '    double r_;',
        'public:',
        '    explicit Circle(double r) : r_(r) {}',
        '    double area() const override { return 3.14159 * r_ * r_; }',
        '};',
        '',
        'int main() {',
        '    std::vector<std::unique_ptr<Shape>> shapes;',
        '    shapes.push_back(std::make_unique<Circle>(2.0));',
        '    std::for_each(shapes.begin(), shapes.end(),',
        '        [](const auto& s) { std::cout << s->area() << std::endl; });',
        '}'
      ].join('\n')
    ],
    long: [
      function () {
        var out = ['#include <iostream>', '#include <vector>', '', '// Generated checksum helpers', ''];
        var names = [];
        var cnt = rp1_int(15, 19);
        for (var i = 1; i <= cnt; i++) {
          var v = rp1_vars(i);
          names.push('checksum' + v.N + i);
          out.push(rp1_fill([
            '// Computes a checksum for {{n}} buffer {{I}}.',
            'static unsigned int checksum{{N}}{{I}}(const std::vector<int>& data) {',
            '    unsigned int sum = {{X}};',
            '    for (std::size_t k = 0; k < data.size(); ++k) {',
            '        sum = sum * 31u + static_cast<unsigned int>(data[k]);',
            '    }',
            '    if (sum % {{X}}u == 0) {',
            '        sum += {{I}}u;',
            '    }',
            '    return sum;',
            '}',
            ''
          ], v));
        }
        out.push('int main() {');
        out.push('    std::vector<int> data = {1, 2, 3};');
        out.push('    unsigned int total = 0;');
        for (var j = 0; j < names.length; j++) out.push('    total += ' + names[j] + '(data);');
        out.push('    std::cout << "total = " << total << std::endl;');
        out.push('    return 0;');
        out.push('}');
        return out.join('\n');
      },
      function () {
        var out = ['#include <cassert>', '#include <iostream>', '#include <string>', ''];
        var names = [];
        var cnt = rp1_int(10, 12);
        for (var i = 1; i <= cnt; i++) {
          var v = rp1_vars(i);
          names.push('test' + v.N + i);
          out.push(rp1_fill([
            'struct {{N}}{{I}} {',
            '    std::string name;',
            '    int count;',
            '    double price;',
            '',
            '    {{N}}{{I}}(const std::string& n, int c) : name(n), count(c), price({{Y}}.5) {}',
            '    double total() const { return count * price; }',
            '    void bump() { count += {{X}}; }',
            '};',
            '',
            'static void test{{N}}{{I}}() {',
            '    {{N}}{{I}} item("{{W}}", {{X}});',
            '    item.bump();',
            '    assert(item.count == {{X}} * 2);',
            '    assert(item.total() > 0.0);',
            '}',
            ''
          ], v));
        }
        out.push('int main() {');
        for (var j = 0; j < names.length; j++) out.push('    ' + names[j] + '();');
        out.push('    std::cout << "all tests passed" << std::endl;');
        out.push('    return 0;');
        out.push('}');
        return out.join('\n');
      }
    ]
  };
})();
(function () {
  var S = window.DT_LANG_SAMPLES = window.DT_LANG_SAMPLES || {};

  var rp2_words = ['user', 'order', 'cache', 'item', 'task', 'event', 'metric', 'session', 'invoice', 'device'];
  var rp2_strs = ['ready', 'failed', 'pending', 'done', 'retry', 'queued', 'stale', 'active'];
  function rp2_pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function rp2_int(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function rp2_cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function rp2_sub(l, v) {
    return l.replace(/\{(i|W|w|n|m|s)\}/g, function (a, k) { return String(v[k]); });
  }
  function rp2_each(vs, lines) {
    var out = [];
    vs.forEach(function (v) { lines.forEach(function (l) { out.push(rp2_sub(l, v)); }); });
    return out;
  }
  // head: array of lines, block: array of template lines, tail: function(vs) -> array of lines
  function rp2_build(head, block, tail) {
    var cnt = rp2_int(15, 22);
    var out = head.slice();
    var vs = [];
    for (var i = 1; i <= cnt; i++) {
      var w = rp2_pick(rp2_words);
      var v = { i: i, W: rp2_cap(w), w: w, n: rp2_int(3, 97), m: rp2_int(2, 9), s: rp2_pick(rp2_strs) };
      vs.push(v);
      block.forEach(function (l) { out.push(rp2_sub(l, v)); });
    }
    return out.concat(tail ? tail(vs) : []).join('\n');
  }

  // ---------------------------------------------------------------- C
  S.c = {
    short: [
      [
        '#include <stdio.h>',
        '#include <stdlib.h>',
        '',
        '/* A tiny singly linked stack of integers */',
        'typedef struct Node {',
        '    int value;',
        '    struct Node *next;',
        '} Node;',
        '',
        'static Node *push(Node *top, int value) {',
        '    Node *n = malloc(sizeof(Node));',
        '    if (n == NULL) {',
        '        fprintf(stderr, "out of memory\\n");',
        '        exit(EXIT_FAILURE);',
        '    }',
        '    n->value = value;',
        '    n->next = top;',
        '    return n;',
        '}'
      ].join('\n'),
      [
        '#include <stdio.h>',
        '',
        '// Sort an array in place using insertion sort.',
        'void insertion_sort(int arr[], size_t len) {',
        '    for (size_t i = 1; i < len; i++) {',
        '        int key = arr[i];',
        '        size_t j = i;',
        '        while (j > 0 && arr[j - 1] > key) {',
        '            arr[j] = arr[j - 1];',
        '            j--;',
        '        }',
        '        arr[j] = key;',
        '    }',
        '}',
        '',
        'int main(void) {',
        '    int data[] = {42, 7, 19, 3, 88, 15};',
        '    size_t n = sizeof(data) / sizeof(data[0]);',
        '    insertion_sort(data, n);',
        '    for (size_t i = 0; i < n; i++) printf("%d ", data[i]);',
        '    return 0;',
        '}'
      ].join('\n'),
      [
        '#include <stdio.h>',
        '#include <ctype.h>',
        '',
        '/* Count the words in a text file. */',
        'int main(int argc, char **argv) {',
        '    if (argc < 2) {',
        '        printf("usage: %s <file>\\n", argv[0]);',
        '        return 1;',
        '    }',
        '    FILE *fp = fopen(argv[1], "r");',
        '    if (!fp) { perror("fopen"); return 2; }',
        '    int c, in_word = 0, words = 0;',
        '    while ((c = fgetc(fp)) != EOF) {',
        '        if (isspace(c)) in_word = 0;',
        '        else if (!in_word) { in_word = 1; words++; }',
        '    }',
        '    fclose(fp);',
        '    printf("%d words\\n", words);',
        '    return 0;',
        '}'
      ].join('\n'),
      [
        '#include <stdio.h>',
        '#include <string.h>',
        '#include <stdbool.h>',
        '',
        '#define MAX_LEN 128',
        '',
        '// Returns true if the string reads the same both ways.',
        'bool is_palindrome(const char *s) {',
        '    size_t i = 0, j = strlen(s);',
        '    while (i < j) {',
        '        if (s[i++] != s[--j]) return false;',
        '    }',
        '    return true;',
        '}',
        '',
        'int main(void) {',
        '    char buf[MAX_LEN] = "racecar";',
        '    printf("%s -> %s\\n", buf, is_palindrome(buf) ? "yes" : "no");',
        '    return 0;',
        '}'
      ].join('\n')
    ],
    long: [
      function () {
        return rp2_build(
          ['#include <stdio.h>', '#include <stdlib.h>', '#include <string.h>', '', '/* Generated numeric helpers */', ''],
          [
            'static int calc_{w}{i}(int x) {',
            '    int acc = {n};',
            '    for (int k = 0; k < x; k++) {',
            '        if (k % {m} == 0) {',
            '            acc += k * {n};',
            '        } else {',
            '            acc -= {m};',
            '        }',
            '    }',
            '    /* status: {s} */',
            '    return acc;',
            '}',
            ''
          ],
          function (vs) {
            return ['int main(void) {', '    long total = 0;'].concat(
              rp2_each(vs, ['    total += calc_{w}{i}({m});'])
            ).concat(['    printf("total = %ld\\n", total);', '    return 0;', '}']);
          }
        );
      },
      function () {
        return rp2_build(
          ['#include <stdio.h>', '#include <string.h>', '', '#define NAME_MAX_LEN 32', ''],
          [
            'typedef struct {',
            '    int id;',
            '    char name[NAME_MAX_LEN];',
            '    double score;',
            '} {W}{i};',
            '',
            'static void init_{w}{i}({W}{i} *r, int id) {',
            '    r->id = id;',
            '    strncpy(r->name, "{s}", NAME_MAX_LEN - 1);',
            '    r->name[NAME_MAX_LEN - 1] = 0;',
            '    r->score = {n} / {m}.0;',
            '}',
            ''
          ],
          function (vs) {
            return ['int main(void) {'].concat(
              rp2_each(vs, [
                '    {',
                '        {W}{i} r;',
                '        init_{w}{i}(&r, {i});',
                '        printf("%d %s %.2f\\n", r.id, r.name, r.score);',
                '    }'
              ])
            ).concat(['    return 0;', '}']);
          }
        );
      }
    ]
  };

  // ---------------------------------------------------------------- Go
  S.go = {
    short: [
      [
        'package main',
        '',
        'import "fmt"',
        '',
        '// Account models a simple bank account.',
        'type Account struct {',
        '\tOwner   string',
        '\tBalance float64',
        '}',
        '',
        'func (a *Account) Deposit(amount float64) error {',
        '\tif amount <= 0 {',
        '\t\treturn fmt.Errorf("invalid amount: %.2f", amount)',
        '\t}',
        '\ta.Balance += amount',
        '\treturn nil',
        '}',
        '',
        'func main() {',
        '\tacc := &Account{Owner: "alice"}',
        '\tif err := acc.Deposit(25.5); err != nil {',
        '\t\tfmt.Println(err)',
        '\t}',
        '}'
      ].join('\n'),
      [
        'package main',
        '',
        'import (',
        '\t"encoding/json"',
        '\t"log"',
        '\t"net/http"',
        ')',
        '',
        'type health struct {',
        '\tStatus string `json:"status"`',
        '}',
        '',
        'func healthHandler(w http.ResponseWriter, r *http.Request) {',
        '\tw.Header().Set("Content-Type", "application/json")',
        '\tjson.NewEncoder(w).Encode(health{Status: "ok"})',
        '}',
        '',
        'func main() {',
        '\thttp.HandleFunc("/health", healthHandler)',
        '\tlog.Fatal(http.ListenAndServe(":8080", nil))',
        '}'
      ].join('\n'),
      [
        'package main',
        '',
        'import (',
        '\t"fmt"',
        '\t"sync"',
        ')',
        '',
        'func square(n int, wg *sync.WaitGroup, out chan<- int) {',
        '\tdefer wg.Done()',
        '\tout <- n * n',
        '}',
        '',
        'func main() {',
        '\tvar wg sync.WaitGroup',
        '\tout := make(chan int, 5)',
        '\tfor i := 1; i <= 5; i++ {',
        '\t\twg.Add(1)',
        '\t\tgo square(i, &wg, out)',
        '\t}',
        '\twg.Wait()',
        '\tclose(out)',
        '\tfor v := range out {',
        '\t\tfmt.Println(v)',
        '\t}',
        '}'
      ].join('\n'),
      [
        'package main',
        '',
        'import "fmt"',
        '',
        '// binarySearch returns the index of target or -1.',
        'func binarySearch(items []int, target int) int {',
        '\tlo, hi := 0, len(items)-1',
        '\tfor lo <= hi {',
        '\t\tmid := lo + (hi-lo)/2',
        '\t\tswitch {',
        '\t\tcase items[mid] == target:',
        '\t\t\treturn mid',
        '\t\tcase items[mid] < target:',
        '\t\t\tlo = mid + 1',
        '\t\tdefault:',
        '\t\t\thi = mid - 1',
        '\t\t}',
        '\t}',
        '\treturn -1',
        '}',
        '',
        'func main() {',
        '\tfmt.Println(binarySearch([]int{1, 3, 5, 7, 9}, 7))',
        '}'
      ].join('\n')
    ],
    long: [
      function () {
        return rp2_build(
          ['package main', '', 'import "fmt"', '', '// Generated types and constructors', ''],
          [
            'type {W}{i} struct {',
            '\tID    int',
            '\tName  string',
            '\tScore int',
            '}',
            '',
            'func New{W}{i}(id int) *{W}{i} {',
            '\treturn &{W}{i}{ID: id, Name: "{s}", Score: {n}}',
            '}',
            '',
            'func (r *{W}{i}) Bump(by int) int {',
            '\tif by > {m} {',
            '\t\tr.Score += by * {m}',
            '\t} else {',
            '\t\tr.Score -= by',
            '\t}',
            '\treturn r.Score',
            '}',
            ''
          ],
          function (vs) {
            return ['func main() {', '\ttotal := 0'].concat(
              rp2_each(vs, ['\ttotal += New{W}{i}({i}).Bump({m})'])
            ).concat(['\tfmt.Println("total:", total)', '}']);
          }
        );
      },
      function () {
        return rp2_build(
          ['package main', '', 'import (', '\t"errors"', '\t"fmt"', ')', '', '// Generated validators', ''],
          [
            'var Err{W}{i} = errors.New("{s}: {w} rejected")',
            '',
            'func Check{W}{i}(v int) (int, error) {',
            '\tif v < {n} {',
            '\t\treturn 0, Err{W}{i}',
            '\t}',
            '\t// scale by a constant factor',
            '\treturn v * {m}, nil',
            '}',
            ''
          ],
          function (vs) {
            return ['func main() {', '\tvar failures int'].concat(
              rp2_each(vs, [
                '\tif _, err := Check{W}{i}({m}); errors.Is(err, Err{W}{i}) {',
                '\t\tfailures++',
                '\t}'
              ])
            ).concat(['\tfmt.Println("failures:", failures)', '}']);
          }
        );
      }
    ]
  };

  // ---------------------------------------------------------------- Rust
  S.rust = {
    short: [
      [
        'use std::fmt;',
        '',
        '#[derive(Debug, Clone, PartialEq)]',
        'struct Point {',
        '    x: f64,',
        '    y: f64,',
        '}',
        '',
        'impl Point {',
        '    fn new(x: f64, y: f64) -> Self {',
        '        Point { x, y }',
        '    }',
        '',
        '    fn distance(&self, other: &Point) -> f64 {',
        '        ((self.x - other.x).powi(2) + (self.y - other.y).powi(2)).sqrt()',
        '    }',
        '}',
        '',
        'impl fmt::Display for Point {',
        '    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {',
        '        write!(f, "({:.1}, {:.1})", self.x, self.y)',
        '    }',
        '}'
      ].join('\n'),
      [
        '// Shapes as an enum with pattern matching.',
        'enum Shape {',
        '    Circle(f64),',
        '    Rect { w: f64, h: f64 },',
        '    Unit,',
        '}',
        '',
        'fn area(shape: &Shape) -> f64 {',
        '    match shape {',
        '        Shape::Circle(r) => std::f64::consts::PI * r * r,',
        '        Shape::Rect { w, h } => w * h,',
        '        Shape::Unit => 1.0,',
        '    }',
        '}',
        '',
        'fn main() {',
        '    let shapes = vec![Shape::Circle(2.0), Shape::Rect { w: 3.0, h: 4.5 }, Shape::Unit];',
        '    for s in &shapes {',
        '        println!("area = {:.2}", area(s));',
        '    }',
        '}'
      ].join('\n'),
      [
        'use std::collections::HashMap;',
        '',
        '/// Count how often each word appears in the text.',
        'fn word_count(text: &str) -> HashMap<String, usize> {',
        '    let mut counts = HashMap::new();',
        '    for word in text.split_whitespace() {',
        '        let key = word.to_lowercase();',
        '        *counts.entry(key).or_insert(0) += 1;',
        '    }',
        '    counts',
        '}',
        '',
        'fn main() {',
        '    let counts = word_count("the quick brown fox jumps over the lazy dog the end");',
        '    let mut pairs: Vec<_> = counts.iter().collect();',
        '    pairs.sort_by(|a, b| b.1.cmp(a.1).then(a.0.cmp(b.0)));',
        '    for (word, n) in pairs.iter().take(3) {',
        '        println!("{word}: {n}");',
        '    }',
        '}'
      ].join('\n'),
      [
        'use std::fs;',
        'use std::io;',
        'use std::num::ParseIntError;',
        '',
        '#[derive(Debug)]',
        'enum ConfigError {',
        '    Io(io::Error),',
        '    Parse(ParseIntError),',
        '}',
        '',
        'fn read_port(path: &str) -> Result<u16, ConfigError> {',
        '    let text = fs::read_to_string(path).map_err(ConfigError::Io)?;',
        '    let port = text.trim().parse::<u16>().map_err(ConfigError::Parse)?;',
        '    Ok(port)',
        '}',
        '',
        'fn main() {',
        '    match read_port("port.txt") {',
        '        Ok(p) => println!("listening on {}", p),',
        '        Err(e) => eprintln!("error: {:?}", e),',
        '    }',
        '}'
      ].join('\n')
    ],
    long: [
      function () {
        return rp2_build(
          ['// Generated model types', '#![allow(dead_code)]', ''],
          [
            '#[derive(Debug, Clone)]',
            'pub struct {W}{i} {',
            '    pub id: u32,',
            '    pub name: String,',
            '    pub score: i64,',
            '}',
            '',
            'impl {W}{i} {',
            '    pub fn new(id: u32) -> Self {',
            '        Self { id, name: String::from("{s}"), score: {n} }',
            '    }',
            '',
            '    pub fn bump(&mut self, by: i64) -> i64 {',
            '        self.score += by * {m};',
            '        self.score',
            '    }',
            '}',
            ''
          ],
          function (vs) {
            return ['fn main() {', '    let mut total: i64 = 0;'].concat(
              rp2_each(vs, ['    total += {W}{i}::new({i}).bump({m});'])
            ).concat(['    println!("total = {}", total);', '}']);
          }
        );
      },
      function () {
        var body = rp2_build(
          ['// Generated parsers with unit tests', '#![allow(dead_code)]', ''],
          [
            'pub fn parse_{w}{i}(input: &str) -> Result<i64, String> {',
            '    let v: i64 = input.trim().parse().map_err(|e| format!("{s}: {}", e))?;',
            '    if v > {n} {',
            '        Err(format!("too big: {}", v))',
            '    } else {',
            '        Ok(v * {m})',
            '    }',
            '}',
            ''
          ],
          function (vs) {
            return ['fn main() {', '    println!("{:?}", parse_' + vs[0].w + '1("1"));', '}', '',
              '#[cfg(test)]', 'mod tests {', '    use super::*;', ''].concat(
              rp2_each(vs, [
                '    #[test]',
                '    fn test_{w}{i}() {',
                '        assert_eq!(parse_{w}{i}("1"), Ok({m}));',
                '        assert!(parse_{w}{i}("abc").is_err());',
                '    }',
                ''
              ])
            ).concat(['}']);
          }
        );
        return body;
      }
    ]
  };

  // ---------------------------------------------------------------- PHP
  S.php = {
    short: [
      [
        '<?php',
        'declare(strict_types=1);',
        '',
        'class User',
        '{',
        '    public function __construct(',
        '        private string $name,',
        '        private string $email,',
        '        private bool $active = true',
        '    ) {}',
        '',
        '    public function getName(): string',
        '    {',
        '        return ucfirst($this->name);',
        '    }',
        '',
        '    public function isValid(): bool',
        '    {',
        '        return $this->active && filter_var($this->email, FILTER_VALIDATE_EMAIL) !== false;',
        '    }',
        '}'
      ].join('\n'),
      [
        '<?php',
        '',
        '// Group orders by customer and total them up.',
        '$orders = [',
        '    ["customer" => "ann", "total" => 30.5],',
        '    ["customer" => "bob", "total" => 12.0],',
        '    ["customer" => "ann", "total" => 7.25],',
        '];',
        '',
        '$totals = [];',
        'foreach ($orders as $order) {',
        '    $name = $order["customer"];',
        '    $totals[$name] = ($totals[$name] ?? 0) + $order["total"];',
        '}',
        '',
        'arsort($totals);',
        'foreach ($totals as $name => $sum) {',
        '    echo sprintf("%-6s %8.2f", $name, $sum) . PHP_EOL;',
        '}'
      ].join('\n'),
      [
        '<?php',
        '',
        'header("Content-Type: application/json");',
        '',
        '$method = $_SERVER["REQUEST_METHOD"];',
        '$path = parse_url($_SERVER["REQUEST_URI"], PHP_URL_PATH);',
        '',
        'if ($method === "GET" && $path === "/api/ping") {',
        '    echo json_encode(["pong" => time()]);',
        '} elseif ($method === "POST" && $path === "/api/echo") {',
        '    $body = json_decode(file_get_contents("php://input"), true);',
        '    echo json_encode(["received" => $body]);',
        '} else {',
        '    http_response_code(404);',
        '    echo json_encode(["error" => "Not found"]);',
        '}'
      ].join('\n'),
      [
        '<?php',
        '',
        'interface Shape',
        '{',
        '    public function area(): float;',
        '}',
        '',
        'final class Circle implements Shape',
        '{',
        '    public function __construct(private float $radius) {}',
        '',
        '    public function area(): float',
        '    {',
        '        return M_PI * $this->radius ** 2;',
        '    }',
        '}',
        '',
        '$shapes = array_map(fn($r) => new Circle($r), [1.0, 2.5, 4.0]);',
        'echo array_sum(array_map(fn(Shape $s) => $s->area(), $shapes));'
      ].join('\n')
    ],
    long: [
      function () {
        return rp2_build(
          ['<?php', 'declare(strict_types=1);', '', '// Generated repository classes', ''],
          [
            'class {W}{i}Repository',
            '{',
            '    private array $rows = [];',
            '',
            '    public function add(string $key, int $value): void',
            '    {',
            '        $this->rows[$key] = $value * {m};',
            '    }',
            '',
            '    public function total(): int',
            '    {',
            '        return array_sum($this->rows) + {n};',
            '    }',
            '',
            '    public function label(): string',
            '    {',
            '        return "{w}-{s}";',
            '    }',
            '}',
            ''
          ],
          function (vs) {
            return ['$grand = 0;'].concat(rp2_each(vs, [
              '$r{i} = new {W}{i}Repository();',
              '$r{i}->add("k", {m});',
              '$grand += $r{i}->total();'
            ])).concat(['echo "grand total: " . $grand . PHP_EOL;']);
          }
        );
      },
      function () {
        return rp2_build(
          ['<?php', '', '// Generated helper functions', ''],
          [
            '/**',
            ' * Filter {w} entries above a threshold.',
            ' */',
            'function filter_{w}_{i}(array $items): array',
            '{',
            '    $out = [];',
            '    foreach ($items as $item) {',
            '        if ($item > {n}) {',
            '            $out[] = $item * {m};',
            '        }',
            '    }',
            '    return $out;',
            '}',
            ''
          ],
          function (vs) {
            return ['$data = [5, 20, 50, 100];'].concat(rp2_each(vs, [
              'printf("%s: %d\\n", "{s}", count(filter_{w}_{i}($data)));'
            ]));
          }
        );
      }
    ]
  };

  // ---------------------------------------------------------------- Ruby
  S.ruby = {
    short: [
      [
        '# frozen_string_literal: true',
        '',
        'class Person',
        '  attr_reader :name, :age',
        '',
        '  def initialize(name, age)',
        '    @name = name',
        '    @age = age',
        '  end',
        '',
        '  def adult?',
        '    age >= 18',
        '  end',
        '',
        '  def to_s',
        '    "#{name} (#{age})"',
        '  end',
        'end',
        '',
        'people = [Person.new("Ann", 34), Person.new("Tim", 12)]',
        'puts people.select(&:adult?).map(&:to_s)'
      ].join('\n'),
      [
        'require "json"',
        '',
        'module Stats',
        '  # Compute the mean of a list of numbers.',
        '  def self.mean(values)',
        '    return 0.0 if values.empty?',
        '    values.sum.to_f / values.size',
        '  end',
        '',
        '  def self.median(values)',
        '    sorted = values.sort',
        '    mid = sorted.size / 2',
        '    sorted.size.odd? ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2.0',
        '  end',
        'end',
        '',
        'data = [4, 8, 15, 16, 23, 42]',
        'puts JSON.generate(mean: Stats.mean(data), median: Stats.median(data))'
      ].join('\n'),
      [
        '# Read a log file and count the levels.',
        'counts = Hash.new(0)',
        '',
        'File.foreach("app.log") do |line|',
        '  next if line.strip.empty?',
        '',
        '  if line =~ /\\b(INFO|WARN|ERROR)\\b/',
        '    counts[$1.downcase.to_sym] += 1',
        '  end',
        'end',
        '',
        'counts.sort_by { |_, n| -n }.each do |level, n|',
        '  puts "#{level.to_s.ljust(6)} #{n}"',
        'end',
        '',
        'exit(1) if counts[:error] > 10'
      ].join('\n'),
      [
        'require "net/http"',
        'require "uri"',
        '',
        'def fetch(url, retries: 3)',
        '  uri = URI.parse(url)',
        '  attempts = 0',
        '  begin',
        '    attempts += 1',
        '    response = Net::HTTP.get_response(uri)',
        '    raise "bad status #{response.code}" unless response.is_a?(Net::HTTPSuccess)',
        '    response.body',
        '  rescue StandardError => e',
        '    retry if attempts < retries',
        '    warn "giving up: #{e.message}"',
        '    nil',
        '  end',
        'end',
        '',
        'puts fetch("https://example.com")&.length'
      ].join('\n')
    ],
    long: [
      function () {
        return rp2_build(
          ['# frozen_string_literal: true', '', '# Generated service classes', ''],
          [
            'class {W}{i}Service',
            '  attr_reader :items',
            '',
            '  def initialize',
            '    @items = []',
            '  end',
            '',
            '  def add(value)',
            '    @items << value * {m}',
            '    self',
            '  end',
            '',
            '  def total',
            '    @items.sum + {n}',
            '  end',
            '',
            '  def label',
            '    "{w}-{s}-#{@items.size}"',
            '  end',
            'end',
            ''
          ],
          function (vs) {
            return ['grand = 0'].concat(rp2_each(vs, [
              'svc{i} = {W}{i}Service.new.add({m}).add({i})',
              'grand += svc{i}.total'
            ])).concat(['puts "grand total: #{grand}"']);
          }
        );
      },
      function () {
        return rp2_build(
          ['# Generated helper module', 'module Helpers', ''],
          [
            '  # Filter {w} values above a threshold.',
            '  def self.filter_{w}_{i}(list)',
            '    list.select { |v| v > {n} }',
            '        .map { |v| v * {m} }',
            '  end',
            '',
            '  def self.describe_{w}_{i}(list)',
            '    kept = filter_{w}_{i}(list)',
            '    kept.empty? ? "{s}: none" : "{s}: #{kept.size} kept"',
            '  end',
            ''
          ],
          function (vs) {
            return ['end', '', 'sample = [5, 20, 50, 100]'].concat(rp2_each(vs, [
              'puts Helpers.describe_{w}_{i}(sample)'
            ]));
          }
        );
      }
    ]
  };

  // ---------------------------------------------------------------- Kotlin
  S.kotlin = {
    short: [
      [
        'package com.example.model',
        '',
        'data class User(',
        '    val id: Int,',
        '    val name: String,',
        '    val email: String? = null,',
        '    val roles: List<String> = emptyList()',
        ')',
        '',
        'fun User.displayName(): String =',
        '    if (email != null) "$name <$email>" else name',
        '',
        'fun main() {',
        '    val users = listOf(User(1, "Ann", "ann@example.com"), User(2, "Bob"))',
        '    users.filter { it.email != null }',
        '        .forEach { println(it.displayName()) }',
        '}'
      ].join('\n'),
      [
        'package com.example.shapes',
        '',
        'sealed class Shape {',
        '    data class Circle(val radius: Double) : Shape()',
        '    data class Rect(val w: Double, val h: Double) : Shape()',
        '    object Empty : Shape()',
        '}',
        '',
        'fun area(shape: Shape): Double = when (shape) {',
        '    is Shape.Circle -> Math.PI * shape.radius * shape.radius',
        '    is Shape.Rect -> shape.w * shape.h',
        '    Shape.Empty -> 0.0',
        '}',
        '',
        'fun main() {',
        '    val shapes = listOf(Shape.Circle(1.5), Shape.Rect(2.0, 3.0), Shape.Empty)',
        '    println(shapes.sumOf { area(it) })',
        '}'
      ].join('\n'),
      [
        'import kotlinx.coroutines.*',
        '',
        'suspend fun fetchValue(id: Int): Int {',
        '    delay(100L * id) // simulate network latency',
        '    return id * id',
        '}',
        '',
        'fun main() = runBlocking {',
        '    val jobs = (1..4).map { id ->',
        '        async(Dispatchers.Default) { fetchValue(id) }',
        '    }',
        '    val results = jobs.awaitAll()',
        '    println("results = $results")',
        '    println("sum = ${results.sum()}")',
        '}'
      ].join('\n'),
      [
        '/** Simple LRU cache built on LinkedHashMap. */',
        'class LruCache<K, V>(private val capacity: Int) {',
        '    private val map = object : LinkedHashMap<K, V>(16, 0.75f, true) {',
        '        override fun removeEldestEntry(eldest: MutableMap.MutableEntry<K, V>?): Boolean =',
        '            size > capacity',
        '    }',
        '',
        '    operator fun get(key: K): V? = map[key]',
        '    operator fun set(key: K, value: V) { map[key] = value }',
        '    val size: Int get() = map.size',
        '}',
        '',
        'fun main() {',
        '    val cache = LruCache<String, Int>(2)',
        '    cache["a"] = 1; cache["b"] = 2; cache["c"] = 3',
        '    println(cache["a"] ?: "evicted")',
        '}'
      ].join('\n')
    ],
    long: [
      function () {
        return rp2_build(
          ['package com.example.generated', '', '// Generated data classes', ''],
          [
            'data class {W}{i}(',
            '    val id: Int,',
            '    val name: String = "{s}",',
            '    val score: Int = {n}',
            ') {',
            '    fun bump(by: Int): {W}{i} {',
            '        val next = if (by > {m}) score + by * {m} else score - by',
            '        return copy(score = next)',
            '    }',
            '',
            '    fun describe(): String = "{w}#$id $name ($score)"',
            '}',
            ''
          ],
          function (vs) {
            return ['fun main() {', '    var total = 0'].concat(rp2_each(vs, [
              '    total += {W}{i}({i}).bump({m}).score'
            ])).concat(['    println("total = $total")', '}']);
          }
        );
      },
      function () {
        return rp2_build(
          ['package com.example.generated', '', '// Generated validators', ''],
          [
            'sealed class Result{i} {',
            '    data class Ok(val value: Int) : Result{i}()',
            '    data class Fail(val reason: String) : Result{i}()',
            '}',
            '',
            'fun check{W}{i}(v: Int): Result{i} = when {',
            '    v < {n} -> Result{i}.Fail("{s}: {w} too small")',
            '    else -> Result{i}.Ok(v * {m})',
            '}',
            ''
          ],
          function (vs) {
            return ['fun main() {', '    var failures = 0'].concat(rp2_each(vs, [
              '    if (check{W}{i}({m}) is Result{i}.Fail) failures++'
            ])).concat(['    println("failures = $failures")', '}']);
          }
        );
      }
    ]
  };

  // ---------------------------------------------------------------- Swift
  S.swift = {
    short: [
      [
        'import Foundation',
        '',
        'struct Task: Identifiable, Codable {',
        '    let id: UUID',
        '    var title: String',
        '    var isDone: Bool = false',
        '    var priority: Int = 0',
        '',
        '    mutating func toggle() {',
        '        isDone.toggle()',
        '    }',
        '}',
        '',
        'var task = Task(id: UUID(), title: "Write docs")',
        'task.toggle()',
        'print("\\(task.title): \\(task.isDone ? "done" : "open")")'
      ].join('\n'),
      [
        'import Foundation',
        '',
        'enum NetworkError: Error {',
        '    case badURL',
        '    case badStatus(Int)',
        '}',
        '',
        'func fetch(_ urlString: String) async throws -> Data {',
        '    guard let url = URL(string: urlString) else {',
        '        throw NetworkError.badURL',
        '    }',
        '    let (data, response) = try await URLSession.shared.data(from: url)',
        '    if let http = response as? HTTPURLResponse, http.statusCode != 200 {',
        '        throw NetworkError.badStatus(http.statusCode)',
        '    }',
        '    return data',
        '}'
      ].join('\n'),
      [
        '// Protocol-oriented shapes',
        'protocol Shape {',
        '    var name: String { get }',
        '    func area() -> Double',
        '}',
        '',
        'struct Circle: Shape {',
        '    let radius: Double',
        '    var name: String { "circle" }',
        '    func area() -> Double { .pi * radius * radius }',
        '}',
        '',
        'struct Square: Shape {',
        '    let side: Double',
        '    var name: String { "square" }',
        '    func area() -> Double { side * side }',
        '}',
        '',
        'let shapes: [Shape] = [Circle(radius: 2), Square(side: 3)]',
        'for s in shapes { print(s.name, s.area()) }'
      ].join('\n'),
      [
        'import Foundation',
        '',
        '// Generic stack with a functional flavour',
        'struct Stack<Element> {',
        '    private var items: [Element] = []',
        '',
        '    mutating func push(_ item: Element) { items.append(item) }',
        '    mutating func pop() -> Element? { items.popLast() }',
        '    var count: Int { items.count }',
        '}',
        '',
        'var stack = Stack<Int>()',
        '[3, 1, 4, 1, 5].forEach { stack.push($0) }',
        'while let top = stack.pop() {',
        '    print("popped \\(top)")',
        '}'
      ].join('\n')
    ],
    long: [
      function () {
        return rp2_build(
          ['import Foundation', '', '// Generated model types', ''],
          [
            'struct {W}{i} {',
            '    let id: Int',
            '    var name: String = "{s}"',
            '    var score: Int = {n}',
            '',
            '    mutating func bump(by amount: Int) -> Int {',
            '        if amount > {m} {',
            '            score += amount * {m}',
            '        } else {',
            '            score -= amount',
            '        }',
            '        return score',
            '    }',
            '}',
            ''
          ],
          function (vs) {
            return ['var total = 0'].concat(rp2_each(vs, [
              'var item{i} = {W}{i}(id: {i})',
              'total += item{i}.bump(by: {m})'
            ])).concat(['print("total = \\(total)")']);
          }
        );
      },
      function () {
        return rp2_build(
          ['import Foundation', '', '// Generated validators and enums', ''],
          [
            'enum {W}{i}Error: Error {',
            '    case tooSmall(Int)',
            '    case rejected(String)',
            '}',
            '',
            'func check{W}{i}(_ value: Int) throws -> Int {',
            '    guard value >= {n} else {',
            '        throw {W}{i}Error.tooSmall(value)',
            '    }',
            '    // status: {s}',
            '    return value * {m}',
            '}',
            ''
          ],
          function (vs) {
            return ['var failures = 0'].concat(rp2_each(vs, [
              'do { _ = try check{W}{i}({m}) } catch { failures += 1 }'
            ])).concat(['print("failures = \\(failures)")']);
          }
        );
      }
    ]
  };
})();
(function () {
  var S = window.DT_LANG_SAMPLES = window.DT_LANG_SAMPLES || {};

  function rp3_int(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function rp3_pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function rp3_take(n, list) {
    var c = list.slice(), r = [], i, j, t;
    for (i = c.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = c[i]; c[i] = c[j]; c[j] = t; }
    for (i = 0; i < n; i++) { r.push(i < c.length ? c[i] : c[i % c.length] + (i + 1)); }
    return r;
  }
  var rp3_words = ['alpha','bravo','cedar','delta','ember','falcon','garnet','harbor','iris','juniper','kepler','lotus','maple','nimbus','onyx','pilot','quartz','raven','sierra','tundra','umber','vertex','willow','xenon','yarrow','zephyr'];
  var rp3_nouns = ['invoice','customer','product','order','shipment','payment','category','supplier','warehouse','review','coupon','ticket','session','account','profile','message','device','project','task','sprint','report','comment','asset','contract','vendor','region'];
  var rp3_regions = ['north','south','east','west','central','coastal'];
  var rp3_first = ['Ava','Liam','Noa','Ethan','Mia','Lucas','Zoe','Omar','Yael','Ivan','Nora','Ravi','Tess','Hugo','Lena','Marco'];
  var rp3_last = ['Cohen','Rivera','Nguyen','Schmidt','Okafor','Silva','Kaplan','Novak','Tanaka','Dubois','Larsen','Reyes'];

  S.sql = {
    short: [
      [
        '-- Schema for a small online shop',
        'CREATE TABLE customers (',
        '  id          BIGSERIAL PRIMARY KEY,',
        '  email       VARCHAR(255) NOT NULL UNIQUE,',
        '  full_name   VARCHAR(120) NOT NULL,',
        '  status      VARCHAR(16)  NOT NULL DEFAULT \'active\',',
        '  created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP',
        ');',
        '',
        'CREATE TABLE orders (',
        '  id           BIGSERIAL PRIMARY KEY,',
        '  customer_id  BIGINT NOT NULL REFERENCES customers (id) ON DELETE CASCADE,',
        '  total_cents  INTEGER NOT NULL CHECK (total_cents >= 0),',
        '  placed_at    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP',
        ');',
        '',
        'CREATE INDEX idx_orders_customer ON orders (customer_id, placed_at DESC);'
      ].join('\n'),
      [
        '-- Revenue per customer for the current year',
        'SELECT c.id,',
        '       c.full_name,',
        '       COUNT(o.id)          AS order_count,',
        '       SUM(o.total_cents) / 100.0 AS revenue,',
        '       MAX(o.placed_at)     AS last_order',
        'FROM customers AS c',
        'INNER JOIN orders AS o ON o.customer_id = c.id',
        'LEFT JOIN coupons AS cp ON cp.order_id = o.id',
        'WHERE o.placed_at >= DATE \'2025-01-01\'',
        '  AND c.status = \'active\'',
        'GROUP BY c.id, c.full_name',
        'HAVING SUM(o.total_cents) > 50000',
        'ORDER BY revenue DESC',
        'LIMIT 20;'
      ].join('\n'),
      [
        '-- Top sellers per month with running totals',
        'WITH monthly AS (',
        '  SELECT date_trunc(\'month\', o.placed_at) AS month,',
        '         i.product_id,',
        '         SUM(i.quantity) AS units',
        '  FROM order_items i',
        '  JOIN orders o ON o.id = i.order_id',
        '  GROUP BY 1, 2',
        ')',
        'SELECT month,',
        '       product_id,',
        '       units,',
        '       RANK() OVER (PARTITION BY month ORDER BY units DESC) AS rnk,',
        '       SUM(units) OVER (PARTITION BY product_id ORDER BY month) AS running_units,',
        '       LAG(units) OVER (PARTITION BY product_id ORDER BY month) AS prev_units',
        'FROM monthly',
        'ORDER BY month, rnk;'
      ].join('\n'),
      [
        'BEGIN;',
        '',
        'INSERT INTO customers (email, full_name, status)',
        'VALUES (\'ava@example.com\', \'Ava Stone\', \'active\'),',
        '       (\'liam@example.com\', \'Liam Cole\', \'pending\');',
        '',
        'UPDATE orders',
        'SET total_cents = total_cents - 500,',
        '    placed_at = NOW()',
        'WHERE customer_id IN (SELECT id FROM customers WHERE status = \'pending\')',
        '  AND total_cents > 500;',
        '',
        'DELETE FROM customers',
        'WHERE status = \'closed\'',
        '  AND created_at < NOW() - INTERVAL \'2 years\';',
        '',
        'COMMIT;'
      ].join('\n')
    ],
    long: [
      function () {
        var n = rp3_int(14, 20), names = rp3_take(n, rp3_nouns), o = [];
        o.push('-- Generated schema: ' + rp3_pick(rp3_words) + ' database', 'BEGIN;', '');
        names.forEach(function (t, i) {
          var ref = i > 0 ? names[rp3_int(0, i - 1)] : null;
          o.push('-- Table ' + (i + 1) + ': ' + t);
          o.push('CREATE TABLE ' + t + ' (');
          o.push('  id          BIGSERIAL PRIMARY KEY,');
          if (ref) { o.push('  ' + ref + '_id  BIGINT NOT NULL REFERENCES ' + ref + ' (id) ON DELETE CASCADE,'); }
          o.push('  name        VARCHAR(' + rp3_pick([64, 120, 255]) + ') NOT NULL,');
          o.push('  code        CHAR(' + rp3_int(6, 12) + ') UNIQUE,');
          o.push('  status      VARCHAR(16) NOT NULL DEFAULT \'' + rp3_pick(['active', 'draft', 'new']) + '\',');
          o.push('  amount      NUMERIC(12, 2) NOT NULL DEFAULT ' + rp3_int(0, 100) + '.00,');
          o.push('  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP');
          o.push(');');
          o.push('CREATE INDEX idx_' + t + '_status ON ' + t + ' (status);');
          o.push('');
        });
        names.slice(0, 3).forEach(function (t) {
          o.push('INSERT INTO ' + t + ' (name, code' + (names.indexOf(t) > 0 ? ', ' + names[0] + '_id' : '') + ')');
          o.push('VALUES (\'' + rp3_pick(rp3_words) + '\', \'' + rp3_pick(rp3_words).slice(0, 5).toUpperCase() + rp3_int(10, 99) + '\'' + (names.indexOf(t) > 0 ? ', 1' : '') + ');');
        });
        o.push('', 'COMMIT;');
        return o.join('\n');
      },
      function () {
        var n = rp3_int(12, 20), o = [];
        o.push('-- Analytics report pack (' + rp3_pick(rp3_words) + ')', '');
        for (var i = 1; i <= n; i++) {
          var t = rp3_pick(rp3_nouns), r = rp3_pick(rp3_regions), y = rp3_int(2022, 2025);
          o.push('-- Report ' + i + ': ' + t + ' totals by ' + r + ' region');
          o.push('WITH monthly AS (');
          o.push('  SELECT date_trunc(\'month\', t.created_at) AS month,');
          o.push('         t.region,');
          o.push('         SUM(t.amount) AS total');
          o.push('  FROM ' + t + ' AS t');
          o.push('  WHERE t.created_at >= DATE \'' + y + '-01-01\'');
          o.push('    AND t.region = \'' + r + '\'');
          o.push('  GROUP BY 1, 2');
          o.push(')');
          o.push('SELECT month, region, total,');
          o.push('       RANK() OVER (PARTITION BY month ORDER BY total DESC) AS rnk,');
          o.push('       LAG(total) OVER (PARTITION BY region ORDER BY month) AS prev_total');
          o.push('FROM monthly');
          o.push('ORDER BY month, rnk;');
          o.push('');
        }
        return o.join('\n');
      }
    ]
  };

  S.shell = {
    short: [
      [
        '#!/usr/bin/env bash',
        'set -euo pipefail',
        '',
        'usage() {',
        '  echo "Usage: $0 [-v] [-n count] name..." >&2',
        '  exit 1',
        '}',
        '',
        'verbose=0; count=1',
        'while getopts "vn:h" opt; do',
        '  case "$opt" in',
        '    v) verbose=1 ;;',
        '    n) count="$OPTARG" ;;',
        '    *) usage ;;',
        '  esac',
        'done',
        'shift $((OPTIND - 1))',
        '[ $# -gt 0 ] || usage',
        '',
        'for name in "$@"; do',
        '  for ((i = 1; i <= count; i++)); do',
        '    echo "Hello, $name ($i/$count)"',
        '  done',
        'done'
      ].join('\n'),
      [
        '#!/usr/bin/env bash',
        '# Nightly backup with rotation',
        'set -euo pipefail',
        '',
        'SRC="${1:-/var/www}"',
        'DEST="/backups"',
        'KEEP=7',
        'STAMP="$(date +%Y%m%d-%H%M%S)"',
        'ARCHIVE="$DEST/site-$STAMP.tar.gz"',
        '',
        'mkdir -p "$DEST"',
        'tar -czf "$ARCHIVE" --exclude=\'*.tmp\' -C "$SRC" .',
        'echo "Created $ARCHIVE ($(du -h "$ARCHIVE" | cut -f1))"',
        '',
        '# Remove old archives beyond the retention count',
        'ls -1t "$DEST"/site-*.tar.gz | tail -n +$((KEEP + 1)) | while read -r old; do',
        '  echo "Removing $old"',
        '  rm -f -- "$old"',
        'done'
      ].join('\n'),
      [
        '#!/usr/bin/env bash',
        '# Summarise an nginx access log',
        'LOG="${1:-/var/log/nginx/access.log}"',
        '',
        'echo "Top 10 client IPs:"',
        'awk \'{print $1}\' "$LOG" | sort | uniq -c | sort -rn | head -n 10',
        '',
        'echo "Status code breakdown:"',
        'awk \'{print $9}\' "$LOG" | grep -E \'^[0-9]{3}$\' | sort | uniq -c | sort -rn',
        '',
        'echo "Slowest endpoints:"',
        'grep -v "GET /static" "$LOG" \\',
        '  | awk \'{print $7, $NF}\' \\',
        '  | sort -k2 -nr \\',
        '  | head -n 5',
        '',
        'echo "5xx errors per hour:"',
        'grep -E \'" 5[0-9]{2} \' "$LOG" | cut -d: -f2 | sort | uniq -c'
      ].join('\n'),
      [
        '#!/usr/bin/env bash',
        '# Simple deploy script',
        'set -euo pipefail',
        '',
        'APP="myapp"',
        'HOST="${DEPLOY_HOST:-deploy@example.com}"',
        'RELEASE="$(git rev-parse --short HEAD)"',
        '',
        'log() { printf \'[%s] %s\\n\' "$(date +%T)" "$*"; }',
        '',
        'build() {',
        '  log "Building $APP@$RELEASE"',
        '  npm ci && npm run build',
        '}',
        '',
        'ship() {',
        '  rsync -az --delete dist/ "$HOST:/srv/$APP/releases/$RELEASE/"',
        '  ssh "$HOST" "ln -sfn /srv/$APP/releases/$RELEASE /srv/$APP/current"',
        '}',
        '',
        'restart() {',
        '  ssh "$HOST" "sudo systemctl restart $APP"',
        '}',
        '',
        'build && ship && restart',
        'log "Deployed $RELEASE"'
      ].join('\n')
    ],
    long: [
      function () {
        var n = rp3_int(12, 20), names = rp3_take(n, rp3_words), o = [];
        o.push('#!/usr/bin/env bash', '# Housekeeping toolkit: ' + rp3_pick(rp3_words), 'set -uo pipefail', '');
        o.push('log() { printf \'[%s] %s\\n\' "$(date +%T)" "$*"; }', '');
        names.forEach(function (w, i) {
          o.push('# Task ' + (i + 1) + ': scan ' + w);
          o.push('scan_' + w.replace(/[^a-z0-9]/g, '_') + '() {');
          o.push('  local dir="${1:-/var/lib/' + w + '}"');
          o.push('  local limit=' + rp3_int(5, 500));
          o.push('  local count=0');
          o.push('  for f in "$dir"/*; do');
          o.push('    [ -e "$f" ] || continue');
          o.push('    count=$((count + 1))');
          o.push('    if [ "$count" -gt "$limit" ]; then');
          o.push('      log "' + w + ': limit reached"');
          o.push('      break');
          o.push('    fi');
          o.push('  done');
          o.push('  echo "' + w + ' processed $count items"');
          o.push('}');
          o.push('');
        });
        o.push('main() {');
        names.forEach(function (w) { o.push('  scan_' + w.replace(/[^a-z0-9]/g, '_')); });
        o.push('}', '', 'main "$@"');
        return o.join('\n');
      },
      function () {
        var n = rp3_int(12, 18), names = rp3_take(n, rp3_words), o = [];
        o.push('#!/usr/bin/env bash', '# Multi-service deploy helper (' + rp3_pick(['staging', 'production', 'canary']) + ')', 'set -euo pipefail', '');
        o.push('ENVIRONMENT="${ENVIRONMENT:-staging}"', 'REGISTRY="registry.example.com/' + rp3_pick(rp3_words) + '"', '');
        names.forEach(function (w, i) {
          o.push('# Service ' + (i + 1));
          o.push('deploy_' + w + '() {');
          o.push('  local image="$REGISTRY/' + w + ':${1:-latest}"');
          o.push('  local tries=0');
          o.push('  echo "Deploying ' + w + ' ($image) to $ENVIRONMENT"');
          o.push('  docker pull "$image"');
          o.push('  while [ "$tries" -lt ' + rp3_int(3, 6) + ' ]; do');
          o.push('    if curl -fsS "http://' + w + '.$ENVIRONMENT.internal:' + rp3_int(3000, 9000) + '/health" >/dev/null; then');
          o.push('      echo "' + w + ' is healthy"');
          o.push('      return 0');
          o.push('    fi');
          o.push('    tries=$((tries + 1))');
          o.push('    sleep ' + rp3_int(1, 5));
          o.push('  done');
          o.push('  echo "' + w + ' failed health checks" >&2');
          o.push('  return 1');
          o.push('}');
          o.push('');
        });
        o.push('for svc in ' + names.join(' ') + '; do', '  "deploy_$svc" "${1:-latest}"', 'done');
        return o.join('\n');
      }
    ]
  };

  S.json = {
    short: [
      [
        '{',
        '  "name": "task-runner",',
        '  "version": "1.4.2",',
        '  "description": "Small CLI for running project tasks",',
        '  "main": "dist/index.js",',
        '  "scripts": {',
        '    "build": "tsc -p .",',
        '    "test": "jest --coverage",',
        '    "lint": "eslint src --ext .ts"',
        '  },',
        '  "dependencies": {',
        '    "commander": "^11.0.0",',
        '    "chalk": "^5.3.0"',
        '  },',
        '  "devDependencies": {',
        '    "typescript": "^5.4.0",',
        '    "jest": "^29.7.0"',
        '  },',
        '  "license": "MIT"',
        '}'
      ].join('\n'),
      [
        '{',
        '  "status": "ok",',
        '  "page": 1,',
        '  "per_page": 2,',
        '  "total": 42,',
        '  "data": [',
        '    {',
        '      "id": 1001,',
        '      "title": "Getting started",',
        '      "author": { "id": 7, "name": "Ava Stone" },',
        '      "tags": ["intro", "guide"],',
        '      "published": true,',
        '      "score": 4.75',
        '    },',
        '    {',
        '      "id": 1002,',
        '      "title": "Advanced usage",',
        '      "author": { "id": 9, "name": "Liam Cole" },',
        '      "tags": [],',
        '      "published": false,',
        '      "score": null',
        '    }',
        '  ]',
        '}'
      ].join('\n'),
      [
        '{',
        '  "server": {',
        '    "host": "0.0.0.0",',
        '    "port": 8080,',
        '    "tls": { "enabled": true, "cert": "/etc/ssl/site.pem" }',
        '  },',
        '  "database": {',
        '    "url": "postgres://app@db.internal:5432/app",',
        '    "pool": { "min": 2, "max": 20 },',
        '    "timeout_ms": 5000',
        '  },',
        '  "logging": {',
        '    "level": "info",',
        '    "targets": ["stdout", "file"]',
        '  },',
        '  "features": {',
        '    "beta": false,',
        '    "rate_limit": 100',
        '  }',
        '}'
      ].join('\n'),
      [
        '{',
        '  "type": "FeatureCollection",',
        '  "features": [',
        '    {',
        '      "type": "Feature",',
        '      "properties": { "name": "Central Park", "kind": "park" },',
        '      "geometry": { "type": "Point", "coordinates": [-73.9654, 40.7829] }',
        '    },',
        '    {',
        '      "type": "Feature",',
        '      "properties": { "name": "Route 1" },',
        '      "geometry": {',
        '        "type": "LineString",',
        '        "coordinates": [[-73.99, 40.73], [-73.98, 40.75], [-73.96, 40.77]]',
        '      }',
        '    }',
        '  ]',
        '}'
      ].join('\n')
    ],
    long: [
      function () {
        var n = rp3_int(16, 24), items = [];
        rp3_take(n, rp3_first).forEach(function (f, i) {
          var l = rp3_pick(rp3_last);
          items.push({
            id: 1000 + i,
            name: f + ' ' + l,
            email: (f + '.' + l).toLowerCase() + '@example.com',
            active: Math.random() > 0.3,
            roles: rp3_take(rp3_int(2, 3), ['admin', 'editor', 'viewer', 'billing', 'support']),
            address: { city: rp3_pick(['Oslo', 'Lyon', 'Porto', 'Turin', 'Kyoto']), zip: String(rp3_int(10000, 99999)), country: rp3_pick(['NO', 'FR', 'PT', 'IT', 'JP']) },
            score: Math.round(Math.random() * 1000) / 10
          });
        });
        return JSON.stringify({ generated: '2025-' + ('0' + rp3_int(1, 12)).slice(-2) + '-15', total: items.length, items: items }, null, 2);
      },
      function () {
        var n = rp3_int(10, 16), feats = [];
        for (var i = 0; i < n; i++) {
          feats.push({
            type: 'Feature',
            id: i + 1,
            properties: { name: rp3_pick(rp3_words) + ' ' + rp3_pick(['Cafe', 'Museum', 'Station', 'Market', 'Library']), category: rp3_pick(['food', 'culture', 'transit', 'shop']), rating: rp3_int(20, 50) / 10 },
            geometry: { type: 'Point', coordinates: [Math.round((-10 + Math.random() * 30) * 10000) / 10000, Math.round((35 + Math.random() * 25) * 10000) / 10000] }
          });
        }
        return JSON.stringify({ type: 'FeatureCollection', name: rp3_pick(rp3_words) + '-places', features: feats }, null, 2);
      }
    ]
  };

  S.xml = {
    short: [
      [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<project xmlns="http://maven.apache.org/POM/4.0.0">',
        '  <modelVersion>4.0.0</modelVersion>',
        '  <groupId>com.example</groupId>',
        '  <artifactId>demo-service</artifactId>',
        '  <version>1.0.0-SNAPSHOT</version>',
        '  <properties>',
        '    <java.version>17</java.version>',
        '  </properties>',
        '  <dependencies>',
        '    <dependency>',
        '      <groupId>org.springframework.boot</groupId>',
        '      <artifactId>spring-boot-starter-web</artifactId>',
        '      <version>3.2.0</version>',
        '    </dependency>',
        '    <dependency>',
        '      <groupId>junit</groupId>',
        '      <artifactId>junit</artifactId>',
        '      <version>4.13.2</version>',
        '      <scope>test</scope>',
        '    </dependency>',
        '  </dependencies>',
        '</project>'
      ].join('\n'),
      [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<feed xmlns="http://www.w3.org/2005/Atom">',
        '  <title>Engineering Blog</title>',
        '  <link href="https://example.com/feed.xml" rel="self"/>',
        '  <updated>2025-03-01T09:00:00Z</updated>',
        '  <id>urn:uuid:60a76c80-d399-11d9-b93C-0003939e0af6</id>',
        '  <entry>',
        '    <title>Releasing version 2</title>',
        '    <link href="https://example.com/posts/v2"/>',
        '    <id>urn:uuid:1225c695-cfb8-4ebb-aaaa-80da344efa6a</id>',
        '    <updated>2025-03-01T09:00:00Z</updated>',
        '    <author><name>Ava Stone</name></author>',
        '    <summary>What changed and how to upgrade.</summary>',
        '  </entry>',
        '</feed>'
      ].join('\n'),
      [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120">',
        '  <defs>',
        '    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">',
        '      <stop offset="0%" stop-color="#4a90d9"/>',
        '      <stop offset="100%" stop-color="#bfe3ff"/>',
        '    </linearGradient>',
        '  </defs>',
        '  <rect width="200" height="120" fill="url(#sky)"/>',
        '  <circle cx="160" cy="30" r="14" fill="#ffd54f"/>',
        '  <path d="M0 100 L50 60 L90 90 L130 50 L200 100 Z" fill="#3b6b3b"/>',
        '  <text x="10" y="20" font-size="12" fill="#fff">Mountains</text>',
        '</svg>'
      ].join('\n'),
      [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<soap:Envelope xmlns:soap="http://www.w3.org/2003/05/soap-envelope"',
        '               xmlns:m="http://example.com/stock">',
        '  <soap:Header>',
        '    <m:Auth>',
        '      <m:Token>abc123</m:Token>',
        '    </m:Auth>',
        '  </soap:Header>',
        '  <soap:Body>',
        '    <m:GetStockPrice>',
        '      <m:StockName>ACME</m:StockName>',
        '      <m:Currency>USD</m:Currency>',
        '    </m:GetStockPrice>',
        '  </soap:Body>',
        '</soap:Envelope>'
      ].join('\n')
    ],
    long: [
      function () {
        var n = rp3_int(28, 40), o = [], libs = rp3_take(n, rp3_words);
        o.push('<?xml version="1.0" encoding="UTF-8"?>');
        o.push('<project xmlns="http://maven.apache.org/POM/4.0.0"');
        o.push('         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"');
        o.push('         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">');
        o.push('  <modelVersion>4.0.0</modelVersion>');
        o.push('  <groupId>com.example.' + rp3_pick(rp3_words) + '</groupId>');
        o.push('  <artifactId>' + rp3_pick(rp3_words) + '-parent</artifactId>');
        o.push('  <version>' + rp3_int(1, 5) + '.' + rp3_int(0, 9) + '.0</version>');
        o.push('  <packaging>jar</packaging>');
        o.push('  <properties>');
        o.push('    <java.version>' + rp3_pick(['11', '17', '21']) + '</java.version>');
        o.push('    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>');
        o.push('  </properties>');
        o.push('  <dependencies>');
        libs.forEach(function (w) {
          o.push('    <dependency>');
          o.push('      <groupId>org.' + rp3_pick(rp3_words) + '.libs</groupId>');
          o.push('      <artifactId>' + w + '-core</artifactId>');
          o.push('      <version>' + rp3_int(1, 9) + '.' + rp3_int(0, 20) + '.' + rp3_int(0, 9) + '</version>');
          o.push('      <scope>' + rp3_pick(['compile', 'runtime', 'test', 'provided']) + '</scope>');
          o.push('    </dependency>');
        });
        o.push('  </dependencies>');
        o.push('  <build>', '    <plugins>', '      <plugin>', '        <artifactId>maven-compiler-plugin</artifactId>', '        <version>3.11.0</version>', '      </plugin>', '    </plugins>', '  </build>');
        o.push('</project>');
        return o.join('\n');
      },
      function () {
        var n = rp3_int(24, 36), o = [], day = 1;
        o.push('<?xml version="1.0" encoding="UTF-8"?>');
        o.push('<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">');
        o.push('  <channel>');
        o.push('    <title>The ' + rp3_pick(rp3_words) + ' Gazette</title>');
        o.push('    <link>https://example.com/</link>');
        o.push('    <description>News and notes from the ' + rp3_pick(rp3_words) + ' team</description>');
        o.push('    <language>en-us</language>');
        for (var i = 1; i <= n; i++) {
          day = 1 + (i % 28);
          o.push('    <item>');
          o.push('      <title>' + rp3_pick(['Notes on', 'Introducing', 'Why we chose', 'Scaling', 'Lessons from']) + ' ' + rp3_pick(rp3_words) + ' ' + rp3_pick(rp3_nouns) + '</title>');
          o.push('      <link>https://example.com/posts/' + i + '</link>');
          o.push('      <guid isPermaLink="false">post-' + rp3_int(1000, 9999) + '-' + i + '</guid>');
          o.push('      <pubDate>' + rp3_pick(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']) + ', ' + (day < 10 ? '0' : '') + day + ' Mar 2025 ' + rp3_int(10, 20) + ':00:00 GMT</pubDate>');
          o.push('      <dc:creator>' + rp3_pick(rp3_first) + ' ' + rp3_pick(rp3_last) + '</dc:creator>');
          o.push('      <category>' + rp3_pick(['engineering', 'product', 'design', 'ops']) + '</category>');
          o.push('      <description><![CDATA[A short summary of post ' + i + ' with <b>markup</b>.]]></description>');
          o.push('    </item>');
        }
        o.push('  </channel>', '</rss>');
        return o.join('\n');
      }
    ]
  };

  S.html = {
    short: [
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '  <meta charset="utf-8">',
        '  <meta name="viewport" content="width=device-width, initial-scale=1">',
        '  <title>Launchpad - ship faster</title>',
        '  <link rel="stylesheet" href="styles.css">',
        '</head>',
        '<body>',
        '  <header class="hero">',
        '    <h1>Ship faster with Launchpad</h1>',
        '    <p>Deploy every branch in seconds.</p>',
        '    <a class="btn" href="#signup">Get started</a>',
        '  </header>',
        '  <section id="features">',
        '    <h2>Features</h2>',
        '    <ul>',
        '      <li>Instant previews</li>',
        '      <li>Rollbacks in one click</li>',
        '    </ul>',
        '  </section>',
        '  <script src="app.js" defer></script>',
        '</body>',
        '</html>'
      ].join('\n'),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '  <meta charset="utf-8">',
        '  <title>Contact us</title>',
        '</head>',
        '<body>',
        '  <form action="/contact" method="post">',
        '    <label for="name">Name</label>',
        '    <input type="text" id="name" name="name" required>',
        '    <label for="email">Email</label>',
        '    <input type="email" id="email" name="email" placeholder="you@example.com" required>',
        '    <label for="topic">Topic</label>',
        '    <select id="topic" name="topic">',
        '      <option value="support">Support</option>',
        '      <option value="sales">Sales</option>',
        '    </select>',
        '    <textarea name="message" rows="4"></textarea>',
        '    <button type="submit">Send</button>',
        '  </form>',
        '</body>',
        '</html>'
      ].join('\n'),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '  <meta charset="utf-8">',
        '  <title>Team roster</title>',
        '</head>',
        '<body>',
        '  <table border="1">',
        '    <caption>Team members</caption>',
        '    <thead>',
        '      <tr><th>Name</th><th>Role</th><th>Start</th></tr>',
        '    </thead>',
        '    <tbody>',
        '      <tr><td>Ava Stone</td><td>Engineer</td><td>2021-04-12</td></tr>',
        '      <tr><td>Liam Cole</td><td>Designer</td><td>2022-09-01</td></tr>',
        '      <tr><td>Noa Levi</td><td>Manager</td><td>2019-01-20</td></tr>',
        '    </tbody>',
        '  </table>',
        '</body>',
        '</html>'
      ].join('\n'),
      [
        '<!doctype html>',
        '<html lang="en">',
        '<head>',
        '  <meta charset="utf-8">',
        '  <title>How tides work</title>',
        '</head>',
        '<body>',
        '  <article>',
        '    <header>',
        '      <h1>How tides work</h1>',
        '      <p>By <a href="/authors/ava">Ava Stone</a>, <time datetime="2025-03-01">1 March 2025</time></p>',
        '    </header>',
        '    <p>Tides are caused by the gravity of the <em>Moon</em> and the Sun.</p>',
        '    <figure>',
        '      <img src="tide.jpg" alt="Waves at high tide">',
        '      <figcaption>High tide at dawn.</figcaption>',
        '    </figure>',
        '    <footer><small>Copyright 2025</small></footer>',
        '  </article>',
        '</body>',
        '</html>'
      ].join('\n')
    ],
    long: [
      function () {
        var n = rp3_int(18, 28), o = [], t = rp3_pick(rp3_words);
        o.push('<!doctype html>', '<html lang="en">', '<head>', '  <meta charset="utf-8">', '  <meta name="viewport" content="width=device-width, initial-scale=1">');
        o.push('  <title>' + t.charAt(0).toUpperCase() + t.slice(1) + ' - product tour</title>', '  <link rel="stylesheet" href="/assets/site.css">', '</head>', '<body>');
        o.push('  <nav class="topbar">', '    <a class="logo" href="/">' + t + '</a>', '    <a href="#pricing">Pricing</a>', '    <a href="#contact">Contact</a>', '  </nav>');
        o.push('  <main>');
        for (var i = 1; i <= n; i++) {
          var w = rp3_pick(rp3_nouns);
          o.push('    <section id="feature-' + i + '" class="feature ' + rp3_pick(['light', 'dark', 'accent']) + '">');
          o.push('      <h2>' + rp3_pick(['Manage', 'Track', 'Automate', 'Share']) + ' your ' + w + 's</h2>');
          o.push('      <p>Keep every ' + w + ' in one place with ' + rp3_pick(rp3_words) + ' sync.</p>');
          o.push('      <ul>');
          o.push('        <li>' + rp3_pick(['Fast search', 'Bulk edit', 'Audit log', 'Templates']) + '</li>');
          o.push('        <li>' + rp3_pick(['Team roles', 'Webhooks', 'Exports', 'Reminders']) + '</li>');
          o.push('      </ul>');
          o.push('      <a class="btn" href="/docs/' + w + '">Learn more</a>');
          o.push('    </section>');
        }
        o.push('  </main>', '  <footer id="contact">', '    <p>Questions? Write to <a href="mailto:hello@example.com">hello@example.com</a></p>', '  </footer>', '  <script src="/assets/site.js" defer></script>', '</body>', '</html>');
        return o.join('\n');
      },
      function () {
        var n = rp3_int(26, 40), o = [];
        o.push('<!doctype html>', '<html lang="en">', '<head>', '  <meta charset="utf-8">', '  <title>' + rp3_pick(rp3_words) + ' orders dashboard</title>', '</head>', '<body>');
        o.push('  <h1>Orders dashboard</h1>', '  <form class="filters" method="get">', '    <input type="search" name="q" placeholder="Search orders">', '    <select name="status">', '      <option>all</option>', '      <option>paid</option>', '      <option>pending</option>', '    </select>', '    <button type="submit">Filter</button>', '  </form>');
        o.push('  <table class="orders">', '    <thead>', '      <tr>', '        <th scope="col">Order</th>', '        <th scope="col">Customer</th>', '        <th scope="col">Status</th>', '        <th scope="col">Items</th>', '        <th scope="col">Total</th>', '      </tr>', '    </thead>', '    <tbody>');
        for (var i = 0; i < n; i++) {
          var st = rp3_pick(['paid', 'pending', 'refunded', 'shipped']);
          o.push('      <tr class="' + st + '">');
          o.push('        <td>#' + (5000 + i * rp3_int(1, 7)) + '</td>');
          o.push('        <td>' + rp3_pick(rp3_first) + ' ' + rp3_pick(rp3_last) + '</td>');
          o.push('        <td><span class="badge">' + st + '</span></td>');
          o.push('        <td>' + rp3_int(1, 12) + '</td>');
          o.push('        <td>$' + rp3_int(10, 900) + '.' + rp3_pick(['00', '50', '99']) + '</td>');
          o.push('      </tr>');
        }
        o.push('    </tbody>', '  </table>', '</body>', '</html>');
        return o.join('\n');
      }
    ]
  };

  S.css = {
    short: [
      [
        '.layout {',
        '  display: grid;',
        '  grid-template-columns: 240px 1fr;',
        '  grid-template-rows: auto 1fr auto;',
        '  grid-template-areas:',
        '    "header header"',
        '    "sidebar main"',
        '    "footer footer";',
        '  min-height: 100vh;',
        '  gap: 16px;',
        '}',
        '.layout > header { grid-area: header; }',
        '.layout > aside  { grid-area: sidebar; }',
        '.layout > main   { grid-area: main; }',
        '.layout > footer { grid-area: footer; }',
        '',
        '.toolbar {',
        '  display: flex;',
        '  align-items: center;',
        '  justify-content: space-between;',
        '  gap: 8px;',
        '}'
      ].join('\n'),
      [
        ':root {',
        '  --brand: #3b82f6;',
        '  --brand-dark: #1d4ed8;',
        '  --radius: 6px;',
        '  --gap: 0.75rem;',
        '}',
        '',
        '.btn {',
        '  display: inline-block;',
        '  padding: 0.5rem 1rem;',
        '  border: 0;',
        '  border-radius: var(--radius);',
        '  background: var(--brand);',
        '  color: #fff;',
        '  font: 600 14px/1.2 system-ui, sans-serif;',
        '  cursor: pointer;',
        '  transition: background 0.2s ease;',
        '}',
        '.btn:hover { background: var(--brand-dark); }',
        '.btn.secondary { background: transparent; color: var(--brand); border: 1px solid currentColor; }'
      ].join('\n'),
      [
        '@keyframes pulse {',
        '  0%   { transform: scale(1);    opacity: 1; }',
        '  50%  { transform: scale(1.15); opacity: 0.7; }',
        '  100% { transform: scale(1);    opacity: 1; }',
        '}',
        '',
        '@keyframes slide-in {',
        '  from { transform: translateX(-100%); }',
        '  to   { transform: translateX(0); }',
        '}',
        '',
        '.badge {',
        '  animation: pulse 1.6s ease-in-out infinite;',
        '}',
        '',
        '.drawer {',
        '  animation: slide-in 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both;',
        '}',
        '',
        '@media (prefers-reduced-motion: reduce) {',
        '  .badge, .drawer { animation: none; }',
        '}'
      ].join('\n'),
      [
        '.container {',
        '  width: 100%;',
        '  max-width: 1100px;',
        '  margin: 0 auto;',
        '  padding: 0 16px;',
        '}',
        '',
        '.cards {',
        '  display: grid;',
        '  grid-template-columns: repeat(3, 1fr);',
        '  gap: 24px;',
        '}',
        '',
        '@media (max-width: 900px) {',
        '  .cards { grid-template-columns: repeat(2, 1fr); }',
        '}',
        '',
        '@media (max-width: 560px) {',
        '  .cards { grid-template-columns: 1fr; }',
        '  .container { padding: 0 8px; }',
        '  h1 { font-size: 1.5rem; }',
        '}'
      ].join('\n')
    ],
    long: [
      function () {
        var n = rp3_int(16, 24), o = [], names = rp3_take(n, rp3_nouns);
        o.push('/* Component library: ' + rp3_pick(rp3_words) + ' theme */', ':root {', '  --primary: #' + rp3_pick(['3b82f6', '10b981', 'f59e0b', '8b5cf6']) + ';', '  --surface: #ffffff;', '  --text: #1f2937;', '  --radius: ' + rp3_int(2, 12) + 'px;', '  --shadow: 0 2px 6px rgba(0, 0, 0, 0.15);', '}', '');
        names.forEach(function (c) {
          o.push('.' + c + ' {');
          o.push('  display: ' + rp3_pick(['flex', 'grid', 'block']) + ';');
          o.push('  padding: ' + rp3_int(4, 24) + 'px ' + rp3_int(8, 32) + 'px;');
          o.push('  margin-bottom: ' + rp3_int(4, 32) + 'px;');
          o.push('  border: 1px solid ' + rp3_pick(['#e5e7eb', '#d1d5db', 'var(--primary)']) + ';');
          o.push('  border-radius: var(--radius);');
          o.push('  background: ' + rp3_pick(['var(--surface)', '#f9fafb', '#eef2ff']) + ';');
          o.push('  color: var(--text);');
          o.push('  box-shadow: ' + rp3_pick(['var(--shadow)', 'none']) + ';');
          o.push('}');
          o.push('.' + c + ':hover { border-color: var(--primary); }');
          o.push('');
        });
        return o.join('\n');
      },
      function () {
        var n = rp3_int(10, 16), o = [], names = rp3_take(n, rp3_words);
        o.push('/* Motion and responsive rules */', '');
        names.forEach(function (w, i) {
          var d = rp3_int(1, 30) / 10;
          o.push('@keyframes ' + w + '-move {');
          o.push('  0%   { transform: translateY(0); opacity: 0; }');
          o.push('  50%  { transform: translateY(-' + rp3_int(4, 24) + 'px); opacity: 1; }');
          o.push('  100% { transform: translateY(0); opacity: ' + rp3_pick(['0.6', '0.8', '1']) + '; }');
          o.push('}');
          o.push('');
          o.push('.anim-' + w + ' {');
          o.push('  animation: ' + w + '-move ' + d + 's ' + rp3_pick(['ease', 'ease-in-out', 'linear']) + ' ' + rp3_pick(['infinite', '2', '1']) + ';');
          o.push('  animation-delay: ' + (i * 0.1).toFixed(1) + 's;');
          o.push('}');
          o.push('@media (max-width: ' + rp3_pick([480, 600, 768, 1024]) + 'px) {');
          o.push('  .anim-' + w + ' { animation-duration: ' + (d * 2).toFixed(1) + 's; font-size: ' + rp3_int(12, 18) + 'px; }');
          o.push('}');
          o.push('');
        });
        return o.join('\n');
      }
    ]
  };

  S.yaml = {
    short: [
      [
        'version: "3.9"',
        'services:',
        '  web:',
        '    image: nginx:1.25',
        '    ports:',
        '      - "8080:80"',
        '    depends_on:',
        '      - api',
        '  api:',
        '    build: ./api',
        '    environment:',
        '      DATABASE_URL: postgres://app:secret@db:5432/app',
        '      LOG_LEVEL: info',
        '    depends_on:',
        '      - db',
        '  db:',
        '    image: postgres:16',
        '    volumes:',
        '      - pgdata:/var/lib/postgresql/data',
        'volumes:',
        '  pgdata: {}'
      ].join('\n'),
      [
        'name: CI',
        'on:',
        '  push:',
        '    branches: [main]',
        '  pull_request:',
        '',
        'jobs:',
        '  test:',
        '    runs-on: ubuntu-latest',
        '    strategy:',
        '      matrix:',
        '        node: [18, 20]',
        '    steps:',
        '      - uses: actions/checkout@v4',
        '      - uses: actions/setup-node@v4',
        '        with:',
        '          node-version: ${{ matrix.node }}',
        '          cache: npm',
        '      - run: npm ci',
        '      - run: npm test -- --coverage'
      ].join('\n'),
      [
        'apiVersion: apps/v1',
        'kind: Deployment',
        'metadata:',
        '  name: web',
        '  labels:',
        '    app: web',
        'spec:',
        '  replicas: 3',
        '  selector:',
        '    matchLabels:',
        '      app: web',
        '  template:',
        '    metadata:',
        '      labels:',
        '        app: web',
        '    spec:',
        '      containers:',
        '        - name: web',
        '          image: registry.example.com/web:1.2.0',
        '          ports:',
        '            - containerPort: 8080',
        '          resources:',
        '            limits: { cpu: 500m, memory: 256Mi }'
      ].join('\n'),
      [
        'openapi: 3.0.3',
        'info:',
        '  title: Pet Store',
        '  version: 1.0.0',
        'paths:',
        '  /pets/{id}:',
        '    get:',
        '      summary: Fetch a pet',
        '      parameters:',
        '        - name: id',
        '          in: path',
        '          required: true',
        '          schema: { type: integer }',
        '      responses:',
        '        "200":',
        '          description: A pet',
        '          content:',
        '            application/json:',
        '              schema:',
        '                $ref: "#/components/schemas/Pet"',
        'components:',
        '  schemas:',
        '    Pet:',
        '      type: object',
        '      properties:',
        '        name: { type: string }'
      ].join('\n')
    ],
    long: [
      function () {
        var n = rp3_int(4, 7), o = [], names = rp3_take(n, rp3_words);
        names.forEach(function (w, i) {
          var port = rp3_int(3000, 9000);
          if (i > 0) { o.push('---'); }
          o.push('# ' + w + ' service');
          o.push('apiVersion: apps/v1', 'kind: Deployment', 'metadata:', '  name: ' + w, '  namespace: ' + rp3_pick(['prod', 'staging']), '  labels:', '    app: ' + w, '    tier: ' + rp3_pick(['backend', 'frontend', 'data']));
          o.push('spec:', '  replicas: ' + rp3_int(1, 6), '  selector:', '    matchLabels:', '      app: ' + w, '  template:', '    metadata:', '      labels:', '        app: ' + w, '    spec:', '      containers:');
          o.push('        - name: ' + w, '          image: registry.example.com/' + w + ':' + rp3_int(1, 4) + '.' + rp3_int(0, 9) + '.' + rp3_int(0, 9), '          ports:', '            - containerPort: ' + port);
          o.push('          env:', '            - name: LOG_LEVEL', '              value: ' + rp3_pick(['info', 'debug', 'warn']), '            - name: PORT', '              value: "' + port + '"');
          o.push('          readinessProbe:', '            httpGet:', '              path: /healthz', '              port: ' + port, '            periodSeconds: ' + rp3_int(5, 20));
          o.push('          resources:', '            requests: { cpu: ' + rp3_pick(['100m', '250m']) + ', memory: ' + rp3_pick(['128Mi', '256Mi']) + ' }', '            limits: { cpu: ' + rp3_pick(['500m', '1']) + ', memory: ' + rp3_pick(['512Mi', '1Gi']) + ' }');
          o.push('---', 'apiVersion: v1', 'kind: Service', 'metadata:', '  name: ' + w, 'spec:', '  selector:', '    app: ' + w, '  ports:', '    - port: 80', '      targetPort: ' + port);
        });
        return o.join('\n');
      },
      function () {
        var n = rp3_int(12, 20), o = [], names = rp3_take(n, rp3_words);
        o.push('# Compose stack: ' + rp3_pick(rp3_words), 'version: "3.9"', '', 'x-common: &common', '  restart: unless-stopped', '  networks: [backend]', '', 'services:');
        names.forEach(function (w, i) {
          o.push('  ' + w + ':');
          o.push('    <<: *common');
          o.push('    image: ' + rp3_pick(['nginx', 'redis', 'postgres', 'node', 'python']) + ':' + rp3_pick(['latest', '16', '7-alpine', '20-slim']));
          o.push('    container_name: ' + w + '_' + (i + 1));
          o.push('    ports:');
          o.push('      - "' + (8000 + i) + ':' + rp3_pick([80, 3000, 5432, 6379]) + '"');
          o.push('    environment:');
          o.push('      APP_NAME: ' + w);
          o.push('      APP_MODE: ' + rp3_pick(['dev', 'prod', 'test']));
          o.push('    volumes:');
          o.push('      - ' + w + '_data:/var/lib/' + w);
          o.push('    healthcheck:');
          o.push('      test: ["CMD", "true"]');
          o.push('      interval: ' + rp3_int(5, 60) + 's');
        });
        o.push('', 'volumes:');
        names.forEach(function (w) { o.push('  ' + w + '_data: {}'); });
        o.push('', 'networks:', '  backend:', '    driver: bridge');
        return o.join('\n');
      }
    ]
  };
})();
