export type ComplexityClass = {
  notation: string;
  name: { en: string; id: string };
  badgeClass: string;
  definition: { en: string; id: string };
  growthBehavior: { en: string; id: string };
  example: { en: string; id: string };
  problematicWhen: { en: string; id: string };
  useCases: { en: string[]; id: string[] };
  snippet: string;
  snippetLanguage: string;
  snippetCaption: { en: string; id: string };
};

export type AnalysisExample = {
  id: string;
  title: { en: string; id: string };
  complexity: string;
  spaceComplexity: string;
  code: string;
  reasoning: { en: string[]; id: string[] };
  explanation: { en: string; id: string };
};

export type BoundDefinition = {
  symbol: string;
  name: { en: string; id: string };
  formal: string;
  intuitive: { en: string; id: string };
  analogy: { en: string; id: string };
};

export const asymptoticBounds: BoundDefinition[] = [
  {
    symbol: "O(f(n))",
    name: { en: "Big O (Asymptotic Upper Bound)", id: "Big O (Batas Atas Asimptotik)" },
    formal: "T(n) <= c * f(n) for all n >= n0 where c > 0, n0 > 0",
    intuitive: {
      en: "Defines the ceiling of growth. The algorithm will grow no faster than this rate as input scales toward infinity.",
      id: "Mendefinisikan batas atas pertumbuhan. Algoritma dijamin tidak tumbuh lebih cepat dari laju ini saat data mendekati tak hingga.",
    },
    analogy: {
      en: "Less than or equal to (<=) in asymptotic terms.",
      id: "Setara dengan operasi kurang dari atau sama dengan (<=) secara asimptotik.",
    },
  },
  {
    symbol: "Ω(f(n))",
    name: { en: "Big Omega (Asymptotic Lower Bound)", id: "Big Omega (Batas Bawah Asimptotik)" },
    formal: "T(n) >= c * f(n) for all n >= n0 where c > 0, n0 > 0",
    intuitive: {
      en: "Defines the floor of growth. The algorithm requires at least this amount of computational work even in the most favorable scenarios.",
      id: "Mendefinisikan batas bawah pertumbuhan. Algoritma membutuhkan setidaknya sejumlah komputasi ini bahkan pada skenario paling ideal.",
    },
    analogy: {
      en: "Greater than or equal to (>=) in asymptotic terms.",
      id: "Setara dengan operasi lebih dari atau sama dengan (>=) secara asimptotik.",
    },
  },
  {
    symbol: "Θ(f(n))",
    name: {
      en: "Big Theta (Asymptotically Tight Bound)",
      id: "Big Theta (Batas Ketat Asimptotik)",
    },
    formal: "c1 * f(n) <= T(n) <= c2 * f(n) for all n >= n0 where c1, c2 > 0, n0 > 0",
    intuitive: {
      en: "Squeezes the algorithm from both above and below. Both upper and lower growth rates coincide within constant multipliers.",
      id: "Mengunci laju pertumbuhan dari atas dan bawah sekaligus. Batas atas dan bawah bertemu dalam konstanta pengali tertentu.",
    },
    analogy: {
      en: "Equal to (=) in asymptotic terms.",
      id: "Setara dengan operasi sama dengan (=) secara asimptotik.",
    },
  },
];

export const complexityClasses: ComplexityClass[] = [
  {
    notation: "O(1)",
    name: { en: "Constant Time", id: "Waktu Konstan" },
    badgeClass: "badge-complexity-constant",
    definition: {
      en: "The number of execution steps remains identical regardless of the dataset size n.",
      id: "Jumlah langkah eksekusi tidak berubah sama sekali berapapun ukuran dataset n.",
    },
    growthBehavior: {
      en: "Flat horizontal line. Doubling or multiplying n has zero impact on operational count.",
      id: "Garis horizontal datar. Menggandakan atau memperbanyak n tidak mempengaruhi jumlah operasi.",
    },
    example: {
      en: "Direct array access via memory offset index, Map lookup by hash key, or push/pop on a stack.",
      id: "Akses array langsung melalui kalkulasi indeks memori, lookup Map dengan hash key, atau operasi stack push/pop.",
    },
    problematicWhen: {
      en: "Never problematic algorithmically, though expensive hidden constants or synchronous I/O can still degrade throughput.",
      id: "Hampir tidak pernah bermasalah secara algoritma, meskipun konstanta internal yang besar atau I/O sinkron tetap dapat memperlambat throughput.",
    },
    useCases: {
      en: [
        "In-memory hash index lookups in cache tiers",
        "Deterministic routing tables and dictionary lookups",
        "Atomic pointer updates in concurrent queues",
      ],
      id: [
        "Pencarian hash index pada lapisan cache memori",
        "Tabel routing deterministik dan kamus lookup",
        "Pembaruan pointer atomik pada antrean concurrent",
      ],
    },
    snippet: `// O(1) Constant Time: direct memory offset lookup
export function getElementByIndex<T>(items: T[], index: number): T | undefined {
  if (index < 0 || index >= items.length) {
    return undefined;
  }
  return items[index];
}`,
    snippetLanguage: "typescript",
    snippetCaption: {
      en: "Direct index access computes memory address in one operation.",
      id: "Akses indeks langsung menghitung alamat memori dalam satu operasi.",
    },
  },
  {
    notation: "O(log n)",
    name: { en: "Logarithmic Time", id: "Waktu Logaritmik" },
    badgeClass: "badge-complexity-log",
    definition: {
      en: "Each step cuts the remaining search domain in half, typically base 2 logarithm.",
      id: "Setiap langkah membagi dua sisa ruang pencarian, umumnya menggunakan logaritma basis 2.",
    },
    growthBehavior: {
      en: "Extremely gentle slope. For n = 1,000,000, log2(n) is roughly 20 operations.",
      id: "Kurva sangat landai. Untuk n = 1.000.000, log2(n) hanya membutuhkan sekitar 20 operasi.",
    },
    example: {
      en: "Binary search on sorted random-access arrays, B-Tree index lookups in relational databases.",
      id: "Binary search pada array terurut, pencarian B-Tree index pada database relasional.",
    },
    problematicWhen: {
      en: "If the underlying collection is unsorted or lacks random access (like a singly-linked list where pointer traversal costs O(n)).",
      id: "Jika koleksi tidak terurut atau tidak mendukung random access (misalnya linked list yang membutuhkan traversal O(n)).",
    },
    useCases: {
      en: [
        "Database B-Tree and LSM-tree index lookups",
        "Bisecting continuous intervals for numerical solutions",
        "Git commit bisect debugging workflows",
      ],
      id: [
        "Pencarian B-Tree dan LSM-tree pada database",
        "Metode bagi-dua untuk kalkulasi numerik",
        "Alur kerja pelacakan bug git bisect",
      ],
    },
    snippet: `// O(log n) Logarithmic Time: binary search on sorted collection
export function binarySearch(items: number[], target: number): number {
  let left = 0;
  let right = items.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (items[mid] === target) return mid;
    if (items[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
}`,
    snippetLanguage: "typescript",
    snippetCaption: {
      en: "Requires sorted array and random access; cuts search space by 50% each iteration.",
      id: "Membutuhkan array terurut dan random access: memotong ruang pencarian sebesar 50% per iterasi.",
    },
  },
  {
    notation: "O(n)",
    name: { en: "Linear Time", id: "Waktu Linear" },
    badgeClass: "badge-complexity-linear",
    definition: {
      en: "Execution time scales in direct 1:1 proportion to the input size n.",
      id: "Waktu eksekusi bertumbuh sebanding 1:1 secara langsung dengan ukuran input n.",
    },
    growthBehavior: {
      en: "Straight diagonal line. Doubling the input size doubles the number of operations.",
      id: "Garis diagonal lurus. Menggandakan ukuran input akan menggandakan jumlah operasi.",
    },
    example: {
      en: "Single pass array inspection, calculating a sum, string parsing, unindexed table scans.",
      id: "Pemeriksaan satu putaran array, kalkulasi total penjumlahan, parsing string, sequential scan tabel tanpa indeks.",
    },
    problematicWhen: {
      en: "When executed synchronously in tight UI event loops or per-request database queries on massive tables.",
      id: "Ketika dieksekusi secara sinkron di event loop UI atau per-request pada tabel database bervolume besar.",
    },
    useCases: {
      en: [
        "Streaming telemetry data parsing and transformation",
        "Linear array filters and mapping pipelines",
        "Sequential validation of incoming HTTP request payloads",
      ],
      id: [
        "Parsing dan transformasi data telemetri streaming",
        "Pipeline filter dan mapping array sederhana",
        "Validasi sekuensial pada payload HTTP request",
      ],
    },
    snippet: `// O(n) Linear Time: single traversal to find maximum
export function findMaximum(items: number[]): number | undefined {
  if (items.length === 0) return undefined;
  let max = items[0];

  for (let i = 1; i < items.length; i++) {
    if (items[i] > max) {
      max = items[i];
    }
  }
  return max;
}`,
    snippetLanguage: "typescript",
    snippetCaption: {
      en: "Must inspect every element at least once to guarantee finding the maximum.",
      id: "Wajib memeriksa setiap elemen setidaknya satu kali untuk memastikan nilai maksimum.",
    },
  },
  {
    notation: "O(n log n)",
    name: { en: "Linearithmic Time", id: "Waktu Linearitmik" },
    badgeClass: "badge-complexity-linearithmic",
    definition: {
      en: "Combines a linear pass across log(n) recursive levels, standard for comparison sorting.",
      id: "Menggabungkan pemrosesan linear di sepanjang log(n) level rekursif, standar untuk sorting pembanding.",
    },
    growthBehavior: {
      en: "Scales slightly faster than linear, remaining highly tractable for millions of records.",
      id: "Tumbuh sedikit lebih cepat dari linear, namun tetap efisien untuk memproses jutaan data.",
    },
    example: {
      en: "Merge Sort, TimSort (standard in V8/JavaScript engine), Heap Sort.",
      id: "Merge Sort, TimSort (standar pada V8 engine JavaScript), Heap Sort.",
    },
    problematicWhen: {
      en: "For array-based merge sort, auxiliary space O(n) can exert significant memory pressure on constrained runtimes.",
      id: "Pada merge sort array, alokasi memori tambahan O(n) dapat membebani runtime dengan RAM terbatas.",
    },
    useCases: {
      en: [
        "Sorting database result sets prior to pagination",
        "Building search indexes and balance-tree construction",
        "Computational geometry sweep-line algorithms",
      ],
      id: [
        "Pengurutan data hasil kueri database sebelum paginasi",
        "Pembangunan search index dan struktur pohon seimbang",
        "Algoritma sweep-line pada geometri komputasi",
      ],
    },
    snippet: `// O(n log n) Linearithmic Time: Merge Sort implementation
export function mergeSort(items: number[]): number[] {
  if (items.length <= 1) return items;
  const mid = Math.floor(items.length / 2);
  const left = mergeSort(items.slice(0, mid));
  const right = mergeSort(items.slice(mid));
  return merge(left, right);
}

function merge(left: number[], right: number[]): number[] {
  const result: number[] = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
    snippetLanguage: "typescript",
    snippetCaption: {
      en: "Divide phase takes log2(n) levels; merge phase does O(n) work per level.",
      id: "Fase bagi membutuhkan log2(n) level: fase gabung memproses O(n) data per level.",
    },
  },
  {
    notation: "O(n²)",
    name: { en: "Quadratic Time", id: "Waktu Kuadratik" },
    badgeClass: "badge-complexity-quadratic",
    definition: {
      en: "Operation count grows with the square of input size; typical of comparing all pairs.",
      id: "Jumlah operasi bertumbuh sebanding dengan kuadrat ukuran input: khas pada perbandingan seluruh pasangan.",
    },
    growthBehavior: {
      en: "Steep upward parabolic curve. Increasing input tenfold increases operations by 100x.",
      id: "Kurva parabola menanjak tajam. Menaikkan input 10 kali lipat melipatgandakan operasi 100x.",
    },
    example: {
      en: "Nested loop duplicate detection, bubble sort, naive all-pairs distance calculations.",
      id: "Deteksi duplikasi dengan perulangan bersarang, bubble sort, kalkulasi jarak seluruh pasangan.",
    },
    problematicWhen: {
      en: "Becomes severely problematic once n exceeds a few thousand items, causing noticeable latency and thread locking.",
      id: "Mulai bermasalah ketika n melebihi beberapa ribu data, menyebabkan lag nyata dan locking thread.",
    },
    useCases: {
      en: [
        "Acceptable for small bounded inputs (n < 50)",
        "Matrix multiplication in basic numerical libraries",
        "Comparing pairwise entities in offline analytics pipelines",
      ],
      id: [
        "Dapat diterima untuk data berukuran kecil yang terikat (n < 50)",
        "Perkalian matriks pada library kalkulasi dasar",
        "Perbandingan pasangan entitas pada pipeline analitik offline",
      ],
    },
    snippet: `// O(n²) Quadratic Time: comparing every pair
export function hasDuplicateNaive<T>(items: T[]): boolean {
  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      if (items[i] === items[j]) {
        return true;
      }
    }
  }
  return false;
}`,
    snippetLanguage: "typescript",
    snippetCaption: {
      en: "Compares n*(n-1)/2 pairs in worst case; optimize to O(n) time using a Set.",
      id: "Membandingkan n*(n-1)/2 pasangan pada skenario terburuk: dapat dioptimasi ke O(n) dengan Set.",
    },
  },
  {
    notation: "O(2ⁿ)",
    name: { en: "Exponential Time", id: "Waktu Eksponensial" },
    badgeClass: "badge-complexity-exponential",
    definition: {
      en: "Growth doubles with each single unit increase in input size n.",
      id: "Pertumbuhan berlipat ganda setiap kali input n bertambah satu satuan.",
    },
    growthBehavior: {
      en: "Near-vertical explosive wall. Unfeasible beyond n = 40 on conventional hardware.",
      id: "Dinding pertumbuhan tegak lurus. Menjadi mustahil dijalankan melebihi n = 40 pada hardware umum.",
    },
    example: {
      en: "Naive recursive Fibonacci calculation, exhaustive power-set generation.",
      id: "Kalkulasi rekursif naif deret Fibonacci, pembentukan seluruh kombinasi himpunan bagian (power set).",
    },
    problematicWhen: {
      en: "Almost immediately problematic for interactive web services unless pruned or memoized.",
      id: "Hampir seketika membekukan aplikasi web interaktif kecuali jika dipotong atau di-memoize.",
    },
    useCases: {
      en: [
        "Theoretical exploration of NP-hard search spaces",
        "Exact brute-force verification for small cryptographic keys",
        "Combinatorial game decision trees",
      ],
      id: [
        "Eksplorasi teoretis pada ruang pencarian NP-hard",
        "Verifikasi brute-force eksak untuk kunci kriptografi mini",
        "Pohon keputusan kombinatorial permainan papan",
      ],
    },
    snippet: `// O(2ⁿ) Exponential Time: naive recursive Fibonacci
export function fibonacciNaive(n: number): number {
  if (n <= 1) return n;
  return fibonacciNaive(n - 1) + fibonacciNaive(n - 2);
}`,
    snippetLanguage: "typescript",
    snippetCaption: {
      en: "Redundantly recalculates subproblems; optimize to O(n) time via memoization or iteration.",
      id: "Menghitung ulang submasalah secara redundan: optimasi ke O(n) dengan memoization atau iterasi.",
    },
  },
  {
    notation: "O(n!)",
    name: { en: "Factorial Time", id: "Waktu Faktorial" },
    badgeClass: "badge-complexity-factorial",
    definition: {
      en: "Grows proportional to n * (n-1) * ... * 1; exhaustive permutations.",
      id: "Bertumbuh sebanding dengan n * (n-1) * ... * 1: permutasi menyeluruh.",
    },
    growthBehavior: {
      en: "The steepest of common complexities. For n = 20, 20! is over 2.4 quintillion operations.",
      id: "Laju tercepat dari seluruh kompleksitas umum. Untuk n = 20, 20! melebihi 2,4 triliun triliun operasi.",
    },
    example: {
      en: "Generating all possible permutations of an array, brute-force Traveling Salesperson Problem.",
      id: "Membuat seluruh permutasi urutan array, brute-force Traveling Salesperson Problem (TSP).",
    },
    problematicWhen: {
      en: "Completely unusable for n > 12 in real-time systems without heuristic approximation.",
      id: "Sama sekali tidak dapat digunakan untuk n > 12 pada sistem waktu nyata tanpa aproksimasi heuristik.",
    },
    useCases: {
      en: [
        "Exhaustive permutation generators for tiny test suites (n <= 8)",
        "Benchmark baseline for testing heuristic optimization algorithms",
      ],
      id: [
        "Generator permutasi lengkap untuk pengujian unit mikro (n <= 8)",
        "Tolok ukur pembanding terhadap algoritma optimasi heuristik",
      ],
    },
    snippet: `// O(n!) Factorial Time: generating all permutations
export function generatePermutations<T>(items: T[]): T[][] {
  if (items.length <= 1) return [items];
  const results: T[][] = [];

  for (let i = 0; i < items.length; i++) {
    const current = items[i];
    const remaining = items.slice(0, i).concat(items.slice(i + 1));
    const subPermutations = generatePermutations(remaining);
    for (const perm of subPermutations) {
      results.push([current, ...perm]);
    }
  }
  return results;
}`,
    snippetLanguage: "typescript",
    snippetCaption: {
      en: "Generates n! permutations; scales impractically beyond n = 10.",
      id: "Menghasilkan n! permutasi: mustahil digunakan melebihi n = 10.",
    },
  },
];

export const analysisExamples: AnalysisExample[] = [
  {
    id: "constant-access",
    title: { en: "1. Constant Access O(1)", id: "1. Akses Konstan O(1)" },
    complexity: "O(1)",
    spaceComplexity: "O(1) auxiliary",
    code: `function getMidpointValue<T>(items: T[]): T | undefined {
  if (items.length === 0) return undefined;
  const midIndex = Math.floor(items.length / 2);
  return items[midIndex];
}`,
    reasoning: {
      en: [
        "Array length check is a single property access: O(1).",
        "Division by 2 and floor operation takes a constant number of CPU cycles: O(1).",
        "Direct array index retrieval uses memory pointer arithmetic: O(1).",
        "Total operations: 1 + 1 + 1 = 3 steps, simplified asymptotically to O(1).",
      ],
      id: [
        "Pemeriksaan panjang array adalah pembacaan properti tunggal: O(1).",
        "Pembagian dua dan fungsi floor membutuhkan siklus CPU konstan: O(1).",
        "Akses indeks array langsung memanfaatkan kalkulasi pointer memori: O(1).",
        "Total operasi: 1 + 1 + 1 = 3 langkah, disederhanakan secara asimptotik menjadi O(1).",
      ],
    },
    explanation: {
      en: "Because execution steps do not multiply with input array length, the complexity is strictly O(1).",
      id: "Karena langkah eksekusi tidak bertambah seiring panjang array masukan, kompleksitasnya adalah O(1).",
    },
  },
  {
    id: "linear-traversal",
    title: { en: "2. Single Linear Loop O(n)", id: "2. Perulangan Tunggal Linear O(n)" },
    complexity: "O(n)",
    spaceComplexity: "O(1) auxiliary",
    code: `function countOccurrences(items: string[], target: string): number {
  let count = 0;
  for (const item of items) {
    if (item === target) {
      count++;
    }
  }
  return count;
}`,
    reasoning: {
      en: [
        "Variable initialization takes O(1) time.",
        "Loop body runs exactly n times where n = items.length.",
        "Inside the loop, comparison and conditional increment are O(1) operations.",
        "Total operations: 1 + n * k = O(n) after dropping additive constant and multiplier k.",
      ],
      id: [
        "Inisialisasi variabel membutuhkan waktu O(1).",
        "Badan perulangan dieksekusi tepat n kali di mana n = items.length.",
        "Di dalam loop, perbandingan dan penambahan angka adalah operasi bernilai O(1).",
        "Total operasi: 1 + n * k = O(n) setelah mengabaikan konstanta aditif dan pengali k.",
      ],
    },
    explanation: {
      en: "Every element in the collection must be evaluated to ensure no target instances are missed.",
      id: "Setiap elemen dalam koleksi harus diperiksa agar tidak ada data target yang terlewat.",
    },
  },
  {
    id: "nested-loops",
    title: { en: "3. Nested Loops O(n²)", id: "3. Perulangan Bersarang O(n²)" },
    complexity: "O(n²)",
    spaceComplexity: "O(1) auxiliary",
    code: `function printAllPairs(items: number[]): void {
  for (let i = 0; i < items.length; i++) {
    for (let j = 0; j < items.length; j++) {
      console.log(items[i], items[j]);
    }
  }
}`,
    reasoning: {
      en: [
        "Outer loop runs n times (i from 0 to n-1).",
        "For each outer iteration, inner loop runs n times (j from 0 to n-1).",
        "Total inner body executions: n * n = n².",
        "Asymptotic complexity: O(n²).",
      ],
      id: [
        "Perulangan luar berjalan n kali (i dari 0 hingga n-1).",
        "Untuk setiap putaran luar, perulangan dalam berjalan n kali (j dari 0 hingga n-1).",
        "Total eksekusi badan perulangan dalam: n * n = n².",
        "Kompleksitas asimptotik: O(n²).",
      ],
    },
    explanation: {
      en: "When loops are nested and both bound to input size n, operations multiply quadratically.",
      id: "Ketika perulangan bersarang dan keduanya terikat pada ukuran input n, operasi berlipat ganda secara kuadratik.",
    },
  },
  {
    id: "logarithmic-halving",
    title: { en: "4. Repeated Halving O(log n)", id: "4. Pembagian Berulang O(log n)" },
    complexity: "O(log n)",
    spaceComplexity: "O(1) auxiliary",
    code: `function countDivisionsByTwo(n: number): number {
  let count = 0;
  let current = n;
  while (current > 1) {
    current = Math.floor(current / 2);
    count++;
  }
  return count;
}`,
    reasoning: {
      en: [
        "At step 0: current = n.",
        "At step 1: current = n / 2.",
        "At step k: current = n / (2^k).",
        "Loop stops when n / (2^k) <= 1, which means 2^k >= n, or k >= log2(n).",
        "The number of iterations is proportional to log2(n), simplified to O(log n).",
      ],
      id: [
        "Pada langkah 0: current = n.",
        "Pada langkah 1: current = n / 2.",
        "Pada langkah k: current = n / (2^k).",
        "Perulangan berhenti saat n / (2^k) <= 1, yang berarti 2^k >= n, atau k >= log2(n).",
        "Jumlah iterasi sebanding dengan log2(n), disederhanakan menjadi O(log n).",
      ],
    },
    explanation: {
      en: "Any loop that divides the problem size by a constant factor on each step exhibits logarithmic complexity.",
      id: "Setiap perulangan yang membagi ukuran masalah dengan faktor konstan di setiap langkah memiliki kompleksitas logaritmik.",
    },
  },
  {
    id: "divide-and-conquer",
    title: { en: "5. Divide and Conquer O(n log n)", id: "5. Divide and Conquer O(n log n)" },
    complexity: "O(n log n)",
    spaceComplexity: "O(n) auxiliary",
    code: `// Recurrence relation: T(n) = 2T(n/2) + O(n)
// Tree depth: log2(n) levels
// Work per level: O(n) total across all subproblems
// Total work: n * log2(n) = O(n log n)`,
    reasoning: {
      en: [
        "The problem of size n is divided into 2 equal subproblems of size n/2.",
        "Recursion tree has log2(n) levels of depth until base case of size 1.",
        "At each level of the tree, merging the partitions takes linear time O(n).",
        "Total work across the entire tree: log2(n) levels * O(n) per level = O(n log n).",
      ],
      id: [
        "Masalah berukuran n dibagi menjadi 2 submasalah berukuran n/2.",
        "Pohon rekursi memiliki kedalaman log2(n) level hingga mencapai base case berukuran 1.",
        "Pada setiap level pohon, proses penggabungan (merge) membutuhkan waktu linear O(n).",
        "Total pekerjaan di seluruh pohon: log2(n) level * O(n) per level = O(n log n).",
      ],
    },
    explanation: {
      en: "Master Theorem Case 2 confirms that divide-and-conquer with linear merge produces linearithmic growth.",
      id: "Teorema Master Kasus 2 mengonfirmasi bahwa pola divide-and-conquer dengan merge linear menghasilkan pertumbuhan linearitmik.",
    },
  },
];

export const engineeringTradeoffs = [
  {
    title: {
      en: "1. Constant Factors Matter for Practical n",
      id: "1. Faktor Konstanta Menentukan pada n Praktis",
    },
    desc: {
      en: "An algorithm with complexity 1000 * n operations is asymptotically superior to one with n² operations. However, for any dataset smaller than n = 1,000, the quadratic algorithm executes fewer operations. Big O ignores constants because it models growth toward infinity, but engineering decisions deal with finite input domains.",
      id: "Algoritma dengan kompleksitas 1000 * n operasi secara asimptotik lebih unggul daripada n² operasi. Namun, untuk dataset berukuran lebih kecil dari n = 1.000, algoritma kuadratik justru menjalankan lebih sedikit operasi. Big O mengabaikan konstanta karena mengukur pertumbuhan menuju tak terhingga, sementara rekayasa perangkat lunak bekerja pada batas domain nyata.",
    },
  },
  {
    title: {
      en: "2. CPU Cache Locality & Spatial Prefetching",
      id: "2. Cache Locality CPU & Spatial Prefetching",
    },
    desc: {
      en: "Modern processors rely heavily on L1/L2/L3 hardware caches. Iterating sequentially through a contiguous array has exceptional spatial locality: the CPU memory controller prefetches adjacent cache lines (64 bytes). Conversely, traversing an O(log n) tree of fragmented pointer nodes across heap memory causes frequent CPU cache misses, making the cache-friendly linear scan faster for modest input sizes.",
      id: "Prosesor modern sangat bergantung pada L1/L2/L3 cache hardware. Membaca array bersebelahan secara sekuensial memiliki spatial locality yang luar biasa: CPU memuat baris cache (64 byte) berikutnya ke memori lokal. Sebaliknya, menelusuri struktur pohon O(log n) dengan node pointer terfragmentasi di heap memicu cache miss, sehingga pembacaan linear sering kali lebih cepat pada data berukuran sedang.",
    },
  },
  {
    title: {
      en: "3. Memory Allocation & Garbage Collection Overhead",
      id: "3. Alokasi Memori & Beban Garbage Collection",
    },
    desc: {
      en: "Achieving a lower time complexity often requires allocating supplementary lookup tables (e.g. trading O(n²) time for O(n) time by constructing a hash set). In high-throughput JavaScript or Node.js runtimes, frequent object allocations exert severe memory pressure on the V8 Young Generation heap, triggering frequent Garbage Collection (GC) pauses that degrade p99 response times.",
      id: "Mencapai kompleksitas waktu yang lebih rendah sering kali menuntut alokasi struktur data tambahan (misalnya menukar waktu O(n²) menjadi O(n) dengan membuat hash set). Pada runtime JavaScript atau Node.js ber-throughput tinggi, alokasi objek masif membebani heap V8 Young Generation, memicu jeda Garbage Collection (GC) yang merusak latensi p99.",
    },
  },
  {
    title: {
      en: "4. Always Measure and Profile Before Optimizing",
      id: "4. Selalu Ukur dan Buat Profil Sebelum Mengoptimasi",
    },
    desc: {
      en: "Algorithmic complexity reveals scalability boundaries, but real latency depends on network round-trips, database query planners, serialization, and disk I/O. Replacing a readable O(n) loop with an intricate O(log n) structure is counterproductive if profiling reveals that 95% of execution time is spent waiting on an external HTTP webhook.",
      id: "Kompleksitas algoritma memetakan batas skalabilitas, namun latensi nyata ditentukan oleh round-trip jaringan, perencana kueri database, serialisasi, dan disk I/O. Mengganti perulangan O(n) yang mudah dibaca dengan struktur O(log n) yang rumit tidak akan berdampak jika profil kinerja menunjukkan bahwa 95% waktu dihabiskan untuk menunggu webhook HTTP eksternal.",
    },
  },
];
