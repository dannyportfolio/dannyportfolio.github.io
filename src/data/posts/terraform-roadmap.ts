import type { BlogPost } from "@/data/blog";

export const terraformRoadmapPost: BlogPost = {
  slug: "terraform-production-engineering-guide",
  title: {
    en: "Terraform in Production: Architecture, State Internals, Security, and Enterprise Workflows",
    id: "Terraform di Produksi: Arsitektur, Internal State, Keamanan, dan Alur Kerja Enterprise",
  },
  summary: {
    en: "A technical reference to Infrastructure as Code with Terraform, grounded in the roadmap.sh curriculum and official cloud provider guidance. Covers HCL, provider internals, state locking and encryption, modular repository design, CI/CD with OIDC, native testing, policy-as-code, cost estimation, and progressive production projects.",
    id: "Referensi teknis Infrastructure as Code dengan Terraform berdasarkan kurikulum roadmap.sh dan panduan resmi penyedia cloud. Membahas HCL, internal provider, state locking dan enkripsi, desain repositori modular, CI/CD dengan OIDC, native testing, policy-as-code, estimasi biaya, dan proyek produksi bertahap.",
  },
  category: {
    en: "Cloud & Infrastructure",
    id: "Cloud & Infrastruktur",
  },
  tags: [
    "Terraform",
    "Infrastructure as Code",
    "OpenTofu",
    "Terragrunt",
    "DevOps",
    "Cloud Security",
    "CI/CD",
    "FinOps",
  ],
  publishedDate: "2026-11-18",
  author: "Danial Fachrudin",
  readingTime: {
    en: "35 min read",
    id: "35 menit baca",
  },
  status: "published",
  seoTitle: {
    en: "Terraform Production Engineering Guide: State, Modules, CI/CD & Security",
    id: "Panduan Rekayasa Produksi Terraform: State, Modul, CI/CD & Keamanan",
  },
  seoDescription: {
    en: "Deep technical guide to Terraform covering HCL, state management, S3 native locking, ephemeral values, OpenTofu, Terragrunt, OIDC CI/CD, Trivy, OPA, and Infracost.",
    id: "Panduan teknis mendalam Terraform mencakup HCL, manajemen state, S3 native locking, ephemeral values, OpenTofu, Terragrunt, CI/CD OIDC, Trivy, OPA, dan Infracost.",
  },
  sections: [
    {
      id: "iac-fundamentals",
      title: {
        en: "1. Infrastructure as Code Fundamentals & Execution Model",
        id: "1. Fundamental Infrastructure as Code & Model Eksekusi",
      },
      paragraphs: {
        en: [
          "Infrastructure as Code (IaC) replaces manual console clicks and ad-hoc shell scripts with versioned, machine-readable definitions. When infrastructure is expressed as code, every network rule, IAM policy, and compute cluster passes through peer review, static analysis, and automated testing before touching a live cloud account.",
          "The central design split in IaC is **declarative** versus **imperative** execution. Imperative tools (such as raw AWS CLI scripts or procedural Ansible playbooks) require you to specify the exact sequence of API calls and handle idempotency, retries, and rollback yourself. Declarative tools like Terraform describe the **desired end state**; the engine inspects the current state, builds a Directed Acyclic Graph (DAG) of dependencies, and computes the minimal diff required to reconcile reality with configuration.",
          "IaC also separates **infrastructure provisioning** from **configuration management** and **image baking**. Terraform excels at lifecycle orchestration of cloud control-plane resources (VPCs, Kubernetes clusters, managed databases, IAM roles). Inside immutable infrastructure workflows, **Packer** bakes OS and runtime dependencies into golden AMIs or container images, while **Ansible** handles post-boot host configuration only where mutable fleet management is unavoidable.",
          "Terraform's core binary (`terraform`) is a graph-walking state engine written in Go. It does not contain cloud-specific API logic; instead, it spawns **provider plugins** as separate local processes and communicates over gRPC. This plugin boundary lets Terraform manage AWS, GCP, Azure, Kubernetes, Cloudflare, and internal HTTP APIs through a unified lifecycle.",
        ],
        id: [
          "Infrastructure as Code (IaC) menggantikan klik manual di konsol cloud dan skrip shell ad-hoc dengan definisi berversi yang dapat dibaca mesin. Ketika infrastruktur ditulis sebagai kode, setiap aturan jaringan, kebijakan IAM, dan klaster komputasi melewati peer review, analisis statis, dan pengujian otomatis sebelum menyentuh akun cloud produksi.",
          "Pemisahan desain utama dalam IaC adalah pendekatan **deklaratif** versus **imperatif**. Alat imperatif (seperti skrip AWS CLI mentah atau playbook prosedural) mengharuskan Anda menentukan urutan panggilan API secara eksplisit serta menangani idempotensi, percobaan ulang, dan rollback sendiri. Alat deklaratif seperti Terraform mendeskripsikan **kondisi akhir yang diinginkan (desired state)**; mesinnya memeriksa kondisi saat ini, membangun Directed Acyclic Graph (DAG) dependensi, lalu menghitung diff minimal untuk menyelaraskan realitas dengan konfigurasi.",
          "IaC juga memisahkan **provisioning infrastruktur** dari **manajemen konfigurasi** dan **pembuatan image**. Terraform unggul dalam orkestrasi siklus hidup resource control-plane cloud (VPC, klaster Kubernetes, database terkelola, peran IAM). Dalam alur kerja infrastruktur imutabel, **Packer** membakar dependensi OS dan runtime ke dalam golden AMI atau container image, sedangkan **Ansible** menangani konfigurasi host pasca-boot hanya ketika manajemen armada mutabel tidak dapat dihindari.",
          "Biner inti Terraform (`terraform`) adalah mesin state berbasis grafik yang ditulis dalam Go. Biner ini tidak menyimpan logika API cloud tertentu; sebagai gantinya, ia menjalankan **plugin provider** sebagai proses lokal terpisah dan berkomunikasi melalui gRPC. Batas plugin ini memungkinkan Terraform mengelola AWS, GCP, Azure, Kubernetes, Cloudflare, dan API internal melalui satu siklus hidup yang seragam.",
        ],
      },
      table: {
        headers: {
          en: ["Tool", "Paradigm", "State Model", "Primary Scope", "When to Prefer"],
          id: ["Alat", "Paradigma", "Model State", "Cakupan Utama", "Kapan Dipilih"],
        },
        rows: {
          en: [
            [
              "**Terraform**",
              "Declarative (HCL)",
              "Explicit state file (`.tfstate`)",
              "Multi-cloud & SaaS control planes",
              "Cross-cloud teams needing mature registry modules and strict plan/apply diffs",
            ],
            [
              "**OpenTofu**",
              "Declarative (HCL, MPL-2.0)",
              "Explicit state + native client-side encryption",
              "Drop-in OSS Terraform alternative",
              "Teams requiring open-source licensing, native state encryption, or early variable evaluation",
            ],
            [
              "**AWS CloudFormation**",
              "Declarative (YAML/JSON)",
              "AWS-managed stack state",
              "AWS-native resources only",
              "Single-cloud AWS shops wanting zero external state storage setup",
            ],
            [
              "**Pulumi**",
              "Imperative-syntax / Declarative engine",
              "Explicit state (Pulumi Cloud or self-hosted)",
              "Multi-cloud using TS, Python, Go, C#",
              "Application teams sharing runtime types/logic directly with infra code",
            ],
            [
              "**Ansible**",
              "Procedural / Idempotent tasks",
              "Stateless (queries target hosts)",
              "OS configuration, packages, fleet orchestration",
              "Configuring existing VMs, bare-metal servers, and network appliances",
            ],
          ],
          id: [
            [
              "**Terraform**",
              "Deklaratif (HCL)",
              "File state eksplisit (`.tfstate`)",
              "Multi-cloud & control plane SaaS",
              "Tim lintas-cloud yang membutuhkan ekosistem modul matang dan diff plan/apply ketat",
            ],
            [
              "**OpenTofu**",
              "Deklaratif (HCL, MPL-2.0)",
              "State eksplisit + enkripsi sisi klien bawaan",
              "Alternatif OSS drop-in untuk Terraform",
              "Tim yang membutuhkan lisensi open-source, enkripsi state bawaan, atau evaluasi variabel awal",
            ],
            [
              "**AWS CloudFormation**",
              "Deklaratif (YAML/JSON)",
              "State stack dikelola AWS",
              "Khusus resource AWS",
              "Organisasi khusus AWS yang tidak ingin mengelola penyimpanan state eksternal",
            ],
            [
              "**Pulumi**",
              "Sintaks imperatif / Mesin deklaratif",
              "State eksplisit (Pulumi Cloud atau self-hosted)",
              "Multi-cloud dengan TS, Python, Go, C#",
              "Tim aplikasi yang ingin berbagi tipe dan logika langsung dengan kode infrastruktur",
            ],
            [
              "**Ansible**",
              "Prosedural / Tugas idempoten",
              "Stateless (memeriksa host target)",
              "Konfigurasi OS, paket, orkestrasi armada",
              "Mengonfigurasi VM yang sudah ada, bare-metal, dan perangkat jaringan",
            ],
          ],
        },
        caption: {
          en: "Architectural comparison of IaC and configuration tools",
          id: "Perbandingan arsitektural alat IaC dan manajemen konfigurasi",
        },
      },
    },
    {
      id: "installation-and-environment",
      title: {
        en: "2. Installation, CLI Architecture, and Environment Setup",
        id: "2. Instalasi, Arsitektur CLI, dan Pengaturan Lingkungan",
      },
      paragraphs: {
        en: [
          "Terraform ships as a single static binary, but production teams rarely rely on a single global version across every repository. Legacy modules pinned to Terraform 1.5 often coexist with newer stacks using 1.10+ features like S3 native locking and ephemeral values. Installing via package managers works for initial setup, while version managers such as `tenv` (supporting both Terraform and OpenTofu) or `tfenv` prevent version drift between developer laptops and CI runners.",
          "Running `terraform init` downloads declared provider binaries into `.terraform/providers/`. To avoid redundant multi-hundred-megabyte downloads across repositories and CI jobs, configure a shared plugin cache directory via `TF_PLUGIN_CACHE_DIR` or the CLI configuration file (`~/.terraformrc` on Linux/macOS, `%APPDATA%\\terraform.rc` on Windows).",
          "Authentication should never rely on static, long-lived IAM access keys or downloaded service account JSON files on disk. On developer workstations, prefer short-lived session credentials (`aws sso login`, `gcloud auth application-default login`, or `az login`). In CI/CD pipelines, use **OpenID Connect (OIDC)** workload identity federation so runners exchange a signed job token for temporary cloud credentials.",
        ],
        id: [
          "Terraform didistribusikan sebagai satu biner statis, namun tim produksi jarang mengandalkan satu versi global di seluruh repositori. Modul lama yang dikunci ke Terraform 1.5 sering berdampingan dengan stack baru yang memakai fitur 1.10+ seperti S3 native locking dan ephemeral values. Instalasi lewat manajer paket cocok untuk awal, sementara manajer versi seperti `tenv` (mendukung Terraform dan OpenTofu) atau `tfenv` mencegah perbedaan versi antara laptop engineer dan runner CI.",
          "Menjalankan `terraform init` mengunduh biner provider ke `.terraform/providers/`. Untuk menghindari pengunduhan berulang ratusan megabyte di banyak repositori, atur direktori cache plugin bersama melalui `TF_PLUGIN_CACHE_DIR` atau file konfigurasi CLI (`~/.terraformrc` di Linux/macOS, `%APPDATA%\\terraform.rc` di Windows).",
          "Autentikasi tidak boleh bergantung pada access key IAM statis berumur panjang atau file JSON service account yang diunduh ke disk. Di workstation engineer, gunakan kredensial sesi berumur pendek (`aws sso login`, `gcloud auth application-default login`, atau `az login`). Di pipeline CI/CD, gunakan federasi identitas **OpenID Connect (OIDC)** agar runner menukar token job bertanda tangan dengan kredensial cloud sementara.",
        ],
      },
      code: {
        language: "bash",
        caption: {
          en: "Illustrative installation & verification across macOS, Linux, and Windows",
          id: "Ilustrasi instalasi & verifikasi di macOS, Linux, dan Windows",
        },
        snippet: `# macOS (Homebrew)
brew tap hashicorp/tap && brew install hashicorp/tap/terraform

# Ubuntu / Debian (APT)
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install -y terraform

# Windows (PowerShell with Chocolatey or Scoop)
choco install terraform -y
# or: scoop install terraform

# Verify binary and enable local plugin cache
terraform -version
export TF_PLUGIN_CACHE_DIR="$HOME/.terraform.d/plugin-cache"`,
      },
    },
    {
      id: "hcl-configuration-language",
      title: {
        en: "3. HCL and Configuration Language Mechanics",
        id: "3. Mekanika HCL dan Bahasa Konfigurasi",
      },
      paragraphs: {
        en: [
          "HashiCorp Configuration Language (HCL) is structured around **blocks** (`resource`, `data`, `variable`, `locals`, `output`, `terraform`, `provider`, `module`), **arguments** (`key = value`), and **expressions**. Unlike pure JSON, HCL supports comments, type constraints, built-in pure functions, and dependency references that Terraform's graph builder parses statically before making any API call.",
          "Distinguish carefully between `variable`, `locals`, and `output`. Input `variable` blocks form the public contract of a module and should always define explicit `type` constraints (`object({...})`, `map(string)`, `list(string)`) and `validation` rules so malformed inputs fail during `plan` rather than mid-apply. `locals` compute internal derived values (naming prefixes, merged tag maps, CIDR splits) without exposing them as caller inputs.",
          "Modern HCL includes three defensive validation layers: `validation` blocks inside variables (checked before the graph runs), `precondition` and `postcondition` blocks inside `lifecycle` (checked against real data sources or resource attributes), and standalone `check` blocks (Terraform 1.5+) that emit continuous health warnings without blocking `apply`. For iterative structures, prefer `for` expressions and `dynamic` blocks over copy-pasted resource definitions, but avoid deeply nested `dynamic` blocks that obscure the resulting infrastructure.",
        ],
        id: [
          "HashiCorp Configuration Language (HCL) tersusun atas **blok** (`resource`, `data`, `variable`, `locals`, `output`, `terraform`, `provider`, `module`), **argumen** (`key = value`), dan **ekspresi**. Berbeda dari JSON murni, HCL mendukung komentar, batasan tipe, fungsi bawaan, serta referensi dependensi yang diparsing secara statis oleh pembangun grafik Terraform sebelum memanggil API.",
          "Bedakan secara tegas antara `variable`, `locals`, dan `output`. Blok `variable` membentuk kontrak publik sebuah modul dan wajib memiliki `type` eksplisit (`object({...})`, `map(string)`, `list(string)`) serta aturan `validation` agar input cacat gagal saat `plan`, bukan di tengah `apply`. `locals` menghitung nilai turunan internal (awalan penamaan, penggabungan tag, pembagian CIDR) tanpa mengeksposnya ke pemanggil modul.",
          "HCL modern memiliki tiga lapisan validasi defensif: blok `validation` pada variabel (diperiksa sebelum grafik berjalan), `precondition` dan `postcondition` di dalam `lifecycle` (diperiksa terhadap data source atau atribut resource nyata), serta blok `check` mandiri (Terraform 1.5+) yang mengeluarkan peringatan kesehatan tanpa memblokir `apply`. Untuk struktur berulang, pilih ekspresi `for` dan blok `dynamic` daripada menyalin definisi resource, namun hindari `dynamic` bersarang terlalu dalam yang mengaburkan arsitektur.",
        ],
      },
      code: {
        language: "hcl",
        caption: {
          en: "Illustrative HCL: typed variables, validation, locals, dynamic blocks, and check assertions",
          id: "Ilustrasi HCL: variabel bertipe, validasi, locals, dynamic block, dan check assertion",
        },
        snippet: `variable "vpc_config" {
  type = object({
    cidr_block         = string
    enable_nat_gateway = optional(bool, true)
    ingress_ports      = list(number)
  })
  validation {
    condition     = can(cidrhost(var.vpc_config.cidr_block, 0))
    error_message = "cidr_block must be a valid IPv4 CIDR notation."
  }
}

locals {
  common_tags = {
    ManagedBy = "terraform"
    Component = "edge-network"
  }
}

resource "aws_security_group" "app" {
  name_prefix = "app-sg-"
  vpc_id      = aws_vpc.main.id

  dynamic "ingress" {
    for_each = toset(var.vpc_config.ingress_ports)
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = [var.vpc_config.cidr_block]
    }
  }

  tags = local.common_tags
}`,
      },
    },
    {
      id: "providers-and-resources",
      title: {
        en: "4. Providers, Dependency Lock Files, and Meta-Arguments",
        id: "4. Provider, Dependency Lock File, dan Meta-Argumen",
      },
      paragraphs: {
        en: [
          "Every `terraform` configuration should pin provider versions using `required_providers` with pessimistic constraints (`~> 5.0`) and commit `.terraform.lock.hcl` to version control. The lock file records the exact provider version and cryptographic SHA256 hashes (`h1:` and `zh:`) of the downloaded binaries. Because `terraform init` only records hashes for the host OS/architecture where it runs, teams mixing macOS/Windows laptops and Linux CI runners should pre-populate multi-platform hashes with `terraform providers lock -platform=linux_amd64 -platform=darwin_arm64 -platform=windows_amd64`.",
          "Terraform infers **implicit dependencies** whenever one resource references an attribute of another (`subnet_id = aws_subnet.private.id`). Use `depends_on` only for **hidden dependencies** that Terraform cannot observe in expressions—such as an application deployment requiring an IAM role policy attachment to propagate before starting.",
          "When creating multiple instances of a resource, prefer `for_each` over `count` for anything beyond simple boolean toggles (`count = var.enabled ? 1 : 0`). `count` indexes instances by integer position; removing an element from the middle of a list shifts every subsequent index and forces Terraform to destroy and recreate unaffected resources. `for_each` keys instances by stable map keys or set strings.",
          "Use `lifecycle` rules deliberately: `create_before_destroy = true` prevents downtime during immutable replacements (note that resources with fixed names cannot coexist, so pair it with `name_prefix`), `prevent_destroy = true` blocks accidental deletion of stateful databases or KMS keys, and `replace_triggered_by` forces replacement when an upstream dependency changes. For onboarding existing infrastructure without manual CLI state surgery, use declarative `import` blocks (Terraform 1.5+), and use `moved` blocks (Terraform 1.1+) when refactoring resource addresses or module paths.",
        ],
        id: [
          "Setiap konfigurasi `terraform` harus mengunci versi provider melalui `required_providers` dengan batasan pesimistis (`~> 5.0`) dan meng-commit `.terraform.lock.hcl` ke Git. Lock file menyimpan versi persis serta hash kriptografis SHA256 (`h1:` dan `zh:`) dari biner provider. Karena `terraform init` bawaan hanya mencatat hash untuk OS/arsitektur lokal, tim yang menggabungkan laptop macOS/Windows dan runner CI Linux sebaiknya mengisi hash lintas platform dengan `terraform providers lock -platform=linux_amd64 -platform=darwin_arm64 -platform=windows_amd64`.",
          "Terraform menyimpulkan **dependensi implisit** setiap kali satu resource mereferensikan atribut resource lain (`subnet_id = aws_subnet.private.id`). Gunakan `depends_on` hanya untuk **dependensi tersembunyi** yang tidak terlihat di ekspresi—seperti deployment aplikasi yang membutuhkan lampiran kebijakan IAM selesai dipropagasikan terlebih dahulu.",
          "Saat membuat banyak instans resource, pilih `for_each` dibanding `count` untuk apa pun selain sakelar boolean sederhana (`count = var.enabled ? 1 : 0`). `count` mengindeks instans berdasarkan posisi integer; menghapus elemen di tengah daftar menggeser seluruh indeks berikutnya dan memaksa Terraform menghancurkan serta membuat ulang resource yang tidak berubah. `for_each` mengindeks instans menggunakan kunci map atau string set yang stabil.",
          "Gunakan aturan `lifecycle` secara terukur: `create_before_destroy = true` mencegah downtime saat penggantian imutabel (pasangkan dengan `name_prefix` agar nama tidak bentrok), `prevent_destroy = true` melindungi database stateful atau kunci KMS dari penghapusan tak disengaja, dan `replace_triggered_by` memicu penggantian saat dependensi hulu berubah. Untuk mengadopsi infrastruktur yang sudah berjalan tanpa operasi CLI manual, gunakan blok deklaratif `import` (Terraform 1.5+), serta blok `moved` (Terraform 1.1+) saat memindahkan alamat resource atau modul.",
        ],
      },
      code: {
        language: "hcl",
        caption: {
          en: "Illustrative provider pinning, multi-region alias, for_each, and declarative import/moved blocks",
          id: "Ilustrasi penguncian provider, alias multi-region, for_each, serta blok import dan moved deklaratif",
        },
        snippet: `terraform {
  required_version = ">= 1.10.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.80"
    }
  }
}

provider "aws" {
  region = "ap-southeast-1"
}

provider "aws" {
  alias  = "dr"
  region = "ap-southeast-3"
}

import {
  to = aws_s3_bucket.logs
  id = "prod-central-audit-logs"
}

resource "aws_s3_bucket" "logs" {
  bucket = "prod-central-audit-logs"
  lifecycle {
    prevent_destroy = true
  }
}`,
      },
    },
    {
      id: "terraform-state-management",
      title: {
        en: "5. Terraform State Management, Locking, and Recovery",
        id: "5. Manajemen State Terraform, Locking, dan Pemulihan",
      },
      paragraphs: {
        en: [
          "Terraform state (`terraform.tfstate`) is the persistent JSON mapping between HCL resource addresses (for example, `module.network.aws_vpc.main`) and real cloud object IDs (`vpc-0a1b2c3d`). State exists for three operational reasons: binding configuration to remote IDs, tracking metadata and dependencies for resources that must be destroyed in reverse order, and caching attributes to accelerate plans on large infrastructures.",
          "Never keep state on a local laptop for shared or production systems. Local state cannot be locked across engineers, creates immediate split-brain divergence, and risks leaking plaintext secrets into Git if committed by mistake. Store state in a **remote backend** with versioning, encryption at rest, and atomic **state locking**. In Terraform 1.10+, the `s3` backend supports native S3 conditional-write locking via `use_lockfile = true`, removing the legacy requirement to provision a separate DynamoDB lock table. GCS (`gcs`) and Azure Blob Storage (`azurerm` with `use_azuread_auth = true`) support locking natively.",
          "**Critical security warning:** Marking an input variable or output as `sensitive = true` only redacts the value from terminal and CI log output. **Terraform still writes the plaintext value into `terraform.tfstate`.** Treat state files with the same access controls as production database credentials. In Terraform 1.10/1.11+, use `ephemeral` blocks and write-only resource arguments to pass short-lived tokens or passwords without persisting them to state. Alternatively, **OpenTofu 1.7+** supports native client-side state and plan encryption using KMS or PBKDF2 passphrases before the file ever leaves the runner.",
          "When state and reality diverge due to out-of-band console edits (**state drift**), inspect the delta safely with `terraform plan -refresh-only` before deciding whether to revert the manual change or accept it into state (`terraform apply -refresh-only`). If a CI runner crashes mid-apply and leaves a stale lock, verify that no pipeline process is actually running before executing `terraform force-unlock <LOCK_ID>`. To drop a resource from Terraform management without deleting the live cloud object, use `terraform state rm <address>` or a declarative `removed` block (Terraform 1.7+) with `lifecycle { destroy = false }`.",
        ],
        id: [
          "State Terraform (`terraform.tfstate`) adalah pemetaan JSON persisten antara alamat resource HCL (misalnya `module.network.aws_vpc.main`) dan ID objek cloud nyata (`vpc-0a1b2c3d`). State ada untuk tiga tujuan operasional: mengikat konfigurasi ke ID jarak jauh, melacak metadata serta dependensi penghapusan terbalik, dan menyimpan cache atribut untuk mempercepat proses plan pada infrastruktur besar.",
          "Jangan pernah menyimpan state di laptop lokal untuk sistem tim atau produksi. State lokal tidak dapat dikunci antar engineer, memicu divergensi split-brain, dan berisiko membocorkan rahasia teks polos ke Git. Simpan state di **remote backend** dengan versioning, enkripsi at-rest, dan **state locking** atomik. Sejak Terraform 1.10+, backend `s3` mendukung penguncian native berbasis conditional write S3 melalui `use_lockfile = true`, menghilangkan keharusan membuat tabel DynamoDB terpisah. GCS (`gcs`) dan Azure Blob Storage (`azurerm` dengan `use_azuread_auth = true`) mendukung locking secara bawaan.",
          "**Peringatan keamanan kritis:** Menandai variabel atau output sebagai `sensitive = true` hanya menyembunyikan nilainya dari terminal dan log CI. **Terraform tetap menulis nilai teks polos tersebut ke dalam `terraform.tfstate`.** Perlakukan file state setara dengan kredensial database produksi. Di Terraform 1.10/1.11+, gunakan blok `ephemeral` dan argumen write-only untuk meneruskan token atau kata sandi berumur pendek tanpa menyimpannya ke state. Sebagai alternatif, **OpenTofu 1.7+** menyediakan enkripsi state dan plan sisi klien bawaan memakai KMS atau passphrase PBKDF2 sebelum file meninggalkan runner.",
          "Ketika state dan realitas menyimpang akibat perubahan manual di konsol (**state drift**), periksa selisihnya secara aman menggunakan `terraform plan -refresh-only` sebelum memutuskan apakah akan menimpa perubahan manual atau menerimanya ke state (`terraform apply -refresh-only`). Jika runner CI mati di tengah apply dan meninggalkan lock menggantung, pastikan tidak ada proses lain yang aktif sebelum menjalankan `terraform force-unlock <LOCK_ID>`. Untuk melepas resource dari pengelolaan Terraform tanpa menghapus objek cloud-nya, gunakan `terraform state rm <address>` atau blok deklaratif `removed` (Terraform 1.7+) dengan `lifecycle { destroy = false }`.",
        ],
      },
      callout: {
        type: "warning",
        text: {
          en: "`sensitive = true` is a UI/log redaction flag, not an encryption boundary. Any secret passed into a standard `resource` attribute is persisted in plaintext inside `terraform.tfstate` unless you use Terraform 1.10+ ephemeral/write-only attributes or OpenTofu client-side state encryption.",
          id: "`sensitive = true` hanyalah penanda penyensoran log/UI, bukan batas enkripsi. Setiap rahasia yang masuk ke atribut `resource` standar tetap tersimpan sebagai teks polos di `terraform.tfstate`, kecuali Anda memakai atribut ephemeral/write-only Terraform 1.10+ atau enkripsi state sisi klien OpenTofu.",
        },
      },
      code: {
        language: "hcl",
        caption: {
          en: "Illustrative remote S3 backend with native locking (Terraform 1.10+) and declarative removal",
          id: "Ilustrasi remote backend S3 dengan native locking (Terraform 1.10+) dan penghapusan deklaratif",
        },
        snippet: `terraform {
  backend "s3" {
    bucket       = "org-prod-tfstate"
    key          = "network/ap-southeast-1/terraform.tfstate"
    region       = "ap-southeast-1"
    encrypt      = true
    use_lockfile = true
  }
}

# Detach a legacy resource from state without destroying the live instance (Terraform 1.7+)
removed {
  from = aws_instance.legacy_bastion
  lifecycle {
    destroy = false
  }
}`,
      },
    },
    {
      id: "modules-and-repository-architecture",
      title: {
        en: "6. Modules, Environment Isolation, and Repository Architecture",
        id: "6. Modul, Isolasi Lingkungan, dan Arsitektur Repositori",
      },
      paragraphs: {
        en: [
          "A **root module** is the working directory where `terraform init` and `apply` execute; **child modules** are reusable packages invoked via `module` blocks. Well-designed modules encapsulate cohesive infrastructure capabilities (such as a VPC with subnets and flow logs, or an EKS cluster with OIDC and node groups) rather than wrapping a single resource with pass-through variables.",
          "Choose environment isolation deliberately. **Terraform Workspaces** (`terraform workspace new staging`) share one backend configuration and one codebase across multiple state files. While convenient for ephemeral feature-branch previews, workspaces become risky for `dev`/`staging`/`prod` separation because all environments share identical provider blocks, IAM assumptions, and module versions—a single syntax error or unguarded change can impact production.",
          "Production platforms favor **directory-per-environment** root modules or **Terragrunt Stacks** (`terragrunt.stack.hcl`). Directory isolation gives each environment its own backend key, explicit provider role assumption, and independent module version pinning (`?ref=v2.4.0`), so staging can test a module upgrade before production adopts it. Terragrunt builds on this pattern by keeping backend and provider generation DRY while orchestrating DAG dependencies across isolated state units.",
        ],
        id: [
          "**Root module** adalah direktori kerja tempat `terraform init` dan `apply` dijalankan; **child module** adalah paket yang dapat digunakan ulang melalui blok `module`. Modul yang dirancang baik membungkus kapabilitas infrastruktur yang utuh (seperti VPC beserta subnet dan flow log, atau klaster EKS beserta OIDC dan node group) alih-alih membungkus satu resource dengan variabel pass-through.",
          "Pilih strategi isolasi lingkungan secara sadar. **Terraform Workspaces** (`terraform workspace new staging`) berbagi satu konfigurasi backend dan satu basis kode di beberapa file state. Meski praktis untuk pratinjau branch sementara, workspace berisiko untuk pemisahan `dev`/`staging`/`prod` karena seluruh lingkungan berbagi blok provider, asumsi IAM, dan versi modul yang identik.",
          "Platform produksi lebih memilih **direktori per lingkungan** atau **Terragrunt Stacks** (`terragrunt.stack.hcl`). Isolasi direktori memberi setiap lingkungan kunci backend sendiri, peran IAM provider eksplisit, dan penguncian versi modul independen (`?ref=v2.4.0`), sehingga staging dapat menguji pembaruan modul sebelum produksi mengadopsinya. Terragrunt memperkuat pola ini dengan menjaga konfigurasi backend/provider tetap DRY sambil mengorkestrasi dependensi DAG antar unit state yang terisolasi.",
        ],
      },
      code: {
        language: "text",
        caption: {
          en: "Production-oriented multi-account repository layout",
          id: "Tata letak repositori multi-akun berorientasi produksi",
        },
        snippet: `infra-live/
├── modules/                      # Versioned or local reusable building blocks
│   ├── network-vpc/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   ├── tests/vpc.tftest.hcl
│   │   └── README.md
│   └── eks-cluster/
└── environments/                 # Isolated root modules (separate state + IAM roles)
    ├── dev/
    │   ├── network/ (backend.tf, main.tf, terraform.tfvars)
    │   └── compute/ (backend.tf, main.tf, terraform.tfvars)
    ├── staging/
    │   ├── network/
    │   └── compute/
    └── prod/
        ├── network/
        └── compute/`,
      },
    },
    {
      id: "workflows-and-operations",
      title: {
        en: "7. Core CLI Workflows and Safe Operational Practices",
        id: "7. Alur Kerja CLI Inti dan Praktik Operasional Aman",
      },
      paragraphs: {
        en: [
          "The standard execution lifecycle follows four deterministic stages: `terraform fmt -check -recursive` (canonical formatting), `terraform validate` (syntax and internal type consistency without remote API calls), `terraform plan -out=tfplan` (computing the execution graph against live state and saving a binary plan), and `terraform apply tfplan` (executing the exact approved plan).",
          "Always pass a saved binary plan file (`tfplan`) to `apply` in automated pipelines. Running `terraform apply` without a saved plan re-evaluates the infrastructure at apply time, meaning changes merged or drifted between review and execution could be applied uninspected.",
          'Avoid `-target=resource` in routine workflows. Targeted applies bypass parts of the dependency graph and leave state partially reconciled; reserve `-target` strictly for emergency incident recovery or breaking circular dependencies. Similarly, replace the legacy `terraform taint` command with `terraform apply -replace="aws_instance.worker"` so the forced replacement is previewed inside a plan before execution.',
        ],
        id: [
          "Siklus eksekusi standar mengikuti empat tahap deterministik: `terraform fmt -check -recursive` (pemformatan kanonik), `terraform validate` (konsistensi sintaks dan tipe internal tanpa panggilan API), `terraform plan -out=tfplan` (menghitung grafik eksekusi terhadap state dan menyimpan rencana biner), serta `terraform apply tfplan` (mengeksekusi rencana yang telah disetujui).",
          "Selalu teruskan file rencana biner (`tfplan`) ke `apply` di pipeline otomatis. Menjalankan `terraform apply` tanpa file rencana akan menghitung ulang perubahan saat eksekusi, sehingga drift atau perubahan di antara waktu review dan apply dapat tereksekusi tanpa inspeksi.",
          'Hindari penggunaan `-target=resource` dalam alur kerja rutin. Apply bertarget melewati sebagian grafik dependensi dan meninggalkan state dalam kondisi tidak selaras; gunakan `-target` hanya untuk pemulihan insiden darurat. Demikian pula, gantikan perintah lama `terraform taint` dengan `terraform apply -replace="aws_instance.worker"` agar penggantian paksa terlihat di dalam plan sebelum dieksekusi.',
        ],
      },
    },
    {
      id: "remote-state-and-team-collaboration",
      title: {
        en: "8. Team Collaboration, Cross-Stack Data, and HCP Terraform",
        id: "8. Kolaborasi Tim, Data Lintas-Stack, dan HCP Terraform",
      },
      paragraphs: {
        en: [
          "When infrastructure is split into small, blast-radius-bounded states (for example, `network` and `compute`), downstream stacks need values such as `vpc_id` or `private_subnet_ids`. While `terraform_remote_state` can read outputs directly from another state bucket, it couples IAM permissions: the compute pipeline must be granted read access to the entire network state file, including any sensitive attributes stored inside it. A cleaner pattern writes non-sensitive integration endpoints to **AWS SSM Parameter Store**, **GCP Secret Manager / Config**, or **Consul**, decoupling state permissions from consumer stacks.",
          "Teams often confuse what the free **Terraform CLI** provides versus **HCP Terraform** (formerly Terraform Cloud) and **Terraform Enterprise** (self-hosted). The CLI handles graph evaluation, state locking against object storage, and local execution. HCP Terraform and Enterprise add managed remote execution runners, PR-triggered speculative plans, role-based access control (RBAC), audit trails, private module registries, continuous drift detection, **Run Tasks** (webhook integrations for Snyk/Infracost), and **Sentinel** policy enforcement—most of which are paid or tier-gated features beyond the free tier.",
        ],
        id: [
          "Ketika infrastruktur dipecah menjadi state kecil dengan blast radius terbatas (misalnya `network` dan `compute`), stack hilir membutuhkan nilai seperti `vpc_id` atau `private_subnet_ids`. Meskipun `terraform_remote_state` dapat membaca output langsung dari bucket state lain, cara ini menggabungkan izin IAM: pipeline compute harus diberi akses baca ke seluruh file state network, termasuk atribut sensitif di dalamnya. Pola yang lebih bersih menuliskan endpoint integrasi non-sensitif ke **AWS SSM Parameter Store** atau penyimpanan konfigurasi terkelola, sehingga izin state terpisah dari konsumennya.",
          "Tim sering menyamakan fitur gratis **Terraform CLI** dengan **HCP Terraform** (dahulu Terraform Cloud) dan **Terraform Enterprise** (self-hosted). CLI menangani evaluasi grafik, state locking ke object storage, dan eksekusi lokal. HCP Terraform dan Enterprise menambahkan runner eksekusi jarak jauh terkelola, speculative plan berbasis PR, RBAC, jejak audit, registri modul privat, deteksi drift berkelanjutan, **Run Tasks**, serta **Sentinel**—yang sebagian besar merupakan fitur berbayar atau dibatasi paket di luar tingkat gratis.",
        ],
      },
    },
    {
      id: "cicd-infrastructure-automation",
      title: {
        en: "9. CI/CD Pipelines and Production Safeguards",
        id: "9. Pipeline CI/CD dan Pengaman Produksi",
      },
      paragraphs: {
        en: [
          "A production IaC pipeline enforces **PR-to-Plan, Merge-to-Apply** separation. Pull requests run formatting, validation, static security scanning, cost diffing, and `terraform plan` using a **read-only OIDC role**, posting the plan summary back to the PR for human review. Merging to `main` triggers `terraform apply` using a **write-scoped OIDC role** gated by a manual environment approval rule.",
          "The same pattern translates cleanly across CI platforms: **GitHub Actions** uses `id-token: write` with `aws-actions/configure-aws-credentials`; **GitLab CI/CD** uses `id_tokens` with `aud` claims and protected environments (`when: manual`); **Jenkins** uses OIDC workload identity or cloud agent IAM instance profiles with `input` approval stages. Never print raw `tfplan` JSON containing secrets to public CI logs, and always set `concurrency` groups per environment so two merges never race.",
        ],
        id: [
          "Pipeline IaC produksi menerapkan pemisahan **PR-to-Plan, Merge-to-Apply**. Pull request menjalankan format, validasi, pemindaian keamanan statis, estimasi biaya, dan `terraform plan` menggunakan **peran OIDC read-only**, lalu menempelkan ringkasan plan ke PR untuk ditinjau. Merge ke `main` memicu `terraform apply` memakai **peran OIDC write-scoped** yang dilindungi persetujuan manual environment.",
          "Pola yang sama berlaku lintas platform CI: **GitHub Actions** memakai `id-token: write` dengan `aws-actions/configure-aws-credentials`; **GitLab CI/CD** memakai `id_tokens` dengan klaim `aud` dan protected environments (`when: manual`); **Jenkins** memakai identitas workload OIDC atau profil IAM agen dengan tahap persetujuan `input`. Jangan pernah mencetak JSON `tfplan` mentah yang memuat rahasia ke log CI publik, dan selalu atur grup `concurrency` per lingkungan.",
        ],
      },
      code: {
        language: "yaml",
        caption: {
          en: "Illustrative GitHub Actions workflow with OIDC, Trivy scan, PR plan, and gated apply",
          id: "Ilustrasi workflow GitHub Actions dengan OIDC, pemindaian Trivy, PR plan, dan apply berpenjaga",
        },
        snippet: `name: Terraform Production Pipeline
on:
  pull_request:
    paths: ["environments/prod/**"]
  push:
    branches: ["main"]
    paths: ["environments/prod/**"]

permissions:
  id-token: write
  contents: read
  pull-requests: write

concurrency:
  group: terraform-prod
  cancel-in-progress: false

jobs:
  plan-and-scan:
    runs-on: ubuntu-latest
    working-directory: environments/prod/network
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.10.5"
      - uses: aquasecurity/trivy-action@master
        with:
          scan-type: "config"
          scan-ref: "."
          exit-code: "1"
          severity: "CRITICAL,HIGH"
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/tf-prod-plan-readonly
          aws-region: ap-southeast-1
      - run: terraform fmt -check -recursive
      - run: terraform init
      - run: terraform validate
      - run: terraform plan -no-color -out=tfplan

  apply:
    if: github.ref == 'refs/heads/main' && github.event_name == 'push'
    needs: plan-and-scan
    runs-on: ubuntu-latest
    environment: production
    working-directory: environments/prod/network
    steps:
      - uses: actions/checkout@v4
      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.10.5"
      - uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::123456789012:role/tf-prod-apply-admin
          aws-region: ap-southeast-1
      - run: terraform init
      - run: terraform apply -auto-approve`,
      },
    },
    {
      id: "testing-and-code-quality",
      title: {
        en: "10. Testing Pyramid and Static Code Quality",
        id: "10. Piramida Pengujian dan Kualitas Kode Statis",
      },
      paragraphs: {
        en: [
          "No single tool validates everything in Terraform. A production quality gate layers fast static checks before slow cloud-API integration tests. **TFLint** catches provider-specific mistakes (invalid AWS instance types, deprecated syntax, missing required tags) that `terraform validate` ignores because `validate` only checks generic schema types.",
          "Static security scanners—**Trivy** (`trivy config .`), **Checkov**, and **Terrascan**—evaluate HCL and compiled JSON plans (`terraform show -json tfplan`) against CIS benchmarks and misconfiguration rules (unencrypted S3 buckets, `0.0.0.0/0` SSH ingress, public RDS instances). Scanning the compiled JSON plan catches issues introduced by dynamic expressions and module defaults that raw HCL scanning can miss.",
          "For behavioral verification, **Terraform Native Tests** (`.tftest.hcl`, introduced in Terraform 1.6 and expanded with `mock_provider` in 1.7) allow both fast unit tests (`command = plan` with `mock_provider` and `override_resource`, incurring zero cloud cost) and real ephemeral integration tests (`command = apply` against a sandbox account, followed by automatic teardown).",
        ],
        id: [
          "Tidak ada satu alat pun yang memvalidasi segalanya di Terraform. Gerbang kualitas produksi menumpuk pemeriksaan statis cepat sebelum uji integrasi API cloud yang lambat. **TFLint** menangkap kesalahan spesifik provider (tipe instans AWS tidak valid, sintaks usang, tag wajib hilang) yang diabaikan `terraform validate`.",
          "Pemindai keamanan statis—**Trivy** (`trivy config .`), **Checkov**, dan **Terrascan**—mengevaluasi HCL serta plan JSON (`terraform show -json tfplan`) terhadap tolok ukur CIS dan aturan salah konfigurasi (bucket S3 tanpa enkripsi, ingress SSH `0.0.0.0/0`, RDS publik). Memindai plan JSON menangkap celah dari ekspresi dinamis dan nilai bawaan modul.",
          "Untuk verifikasi perilaku, **Terraform Native Tests** (`.tftest.hcl`, hadir di Terraform 1.6 dan dilengkapi `mock_provider` di 1.7) memungkinkan unit test cepat (`command = plan` dengan `mock_provider` dan `override_resource` tanpa biaya cloud) maupun uji integrasi nyata (`command = apply` di akun sandbox dengan pembersihan otomatis).",
        ],
      },
      table: {
        headers: {
          en: ["Validation Layer", "What It Proves", "What It Cannot Prove"],
          id: ["Lapisan Validasi", "Apa yang Dibuktikan", "Apa yang Tidak Bisa Dibuktikan"],
        },
        rows: {
          en: [
            [
              "`terraform fmt` / `validate`",
              "Canonical formatting, HCL syntax, internal variable/output types",
              "Cloud quota limits, valid AMI IDs, IAM permissions, security posture",
            ],
            [
              "`tflint`",
              "Provider-aware attribute validity, deprecated args, naming rules",
              "Cross-account runtime conflicts or live network reachability",
            ],
            [
              "`trivy config` / `checkov`",
              "Static compliance against CIS/cloud security benchmarks",
              "Business logic correctness or runtime IAM privilege escalation chains",
            ],
            [
              "`terraform test` (`mock_provider`)",
              "Module conditionals, tag logic, resource counts without cloud spend",
              "Real cloud API rejections, provider bugs, or actual resource provisioning",
            ],
            [
              "`terraform test` (`command = apply`)",
              "End-to-end provisioning, cloud API acceptance, destroy cleanliness",
              "Long-term production load behavior or multi-month state upgrades",
            ],
          ],
          id: [
            [
              "`terraform fmt` / `validate`",
              "Format kanonik, sintaks HCL, tipe variabel/output internal",
              "Batas kuota cloud, validitas ID AMI, izin IAM, atau postur keamanan",
            ],
            [
              "`tflint`",
              "Validitas atribut spesifik provider, argumen usang, aturan penamaan",
              "Konflik runtime lintas akun atau konektivitas jaringan nyata",
            ],
            [
              "`trivy config` / `checkov`",
              "Kepatuhan statis terhadap tolok ukur keamanan cloud/CIS",
              "Kebenaran logika bisnis atau rantai eskalasi hak akses IAM saat runtime",
            ],
            [
              "`terraform test` (`mock_provider`)",
              "Logika kondisional modul, tag, dan jumlah resource tanpa biaya cloud",
              "Penolakan API cloud nyata atau bug provider saat provisioning",
            ],
            [
              "`terraform test` (`command = apply`)",
              "Provisioning end-to-end, penerimaan API cloud, dan kebersihan destroy",
              "Perilaku beban produksi jangka panjang atau migrasi state lintas versi",
            ],
          ],
        },
      },
      code: {
        language: "hcl",
        caption: {
          en: "Illustrative Terraform native unit test (tests/vpc.tftest.hcl) using mock_provider",
          id: "Ilustrasi unit test native Terraform (tests/vpc.tftest.hcl) menggunakan mock_provider",
        },
        snippet: `mock_provider "aws" {
  override_resource {
    target = aws_vpc.main
    values = {
      id = "vpc-mock12345"
    }
  }
}

run "verify_prod_vpc_tags" {
  command = plan

  variables {
    environment = "prod"
    cidr_block  = "10.20.0.0/16"
  }

  assert {
    condition     = aws_vpc.main.tags["Environment"] == "prod"
    error_message = "Production VPC must carry Environment=prod tag."
  }
}`,
      },
    },
    {
      id: "security-and-compliance",
      title: {
        en: "11. Security, Supply Chain, and Policy-as-Code",
        id: "11. Keamanan, Rantai Pasok, dan Policy-as-Code",
      },
      paragraphs: {
        en: [
          "Terraform pipelines hold extraordinary privilege: an attacker who compromises a CI apply role or a state bucket often gains administrative control over the entire cloud account. Defense-in-depth starts with **split IAM roles** (read-only for PR plans, scoped write for main applies), **OIDC short-lived tokens**, and **network-hardened state storage** (private endpoints, bucket versioning, KMS CMK encryption, public access blocked).",
          "Supply-chain risk enters through third-party **providers** and **public registry modules**. Pin module sources to immutable Git commit SHAs or exact semantic tags (`?ref=v5.1.2`), review module diffs before upgrading, and verify provider checksums via `.terraform.lock.hcl`. Never reference unpinned `main` branches in production modules.",
          "For organizational governance, **Policy-as-Code** enforces guardrails against the compiled `tfplan.json` before `apply`. **Open Policy Agent (OPA)** via `conftest` or `trivy` custom Rego policies runs open-source and vendor-neutrally in any CI pipeline. **HashiCorp Sentinel** provides tightly integrated policy checks inside paid HCP Terraform and Terraform Enterprise tiers.",
        ],
        id: [
          "Pipeline Terraform memiliki hak akses yang sangat tinggi: penyerang yang menguasai peran apply CI atau bucket state sering kali memperoleh kendali penuh atas akun cloud. Pertahanan berlapis dimulai dari **pemisahan peran IAM** (read-only untuk plan PR, write-scoped untuk apply di main), **token OIDC berumur pendek**, dan **penyimpanan state yang diperketat jaringannya** (private endpoint, bucket versioning, enkripsi KMS, blokir akses publik).",
          "Risiko rantai pasok masuk melalui **provider** pihak ketiga dan **modul registri publik**. Kunci sumber modul ke hash commit Git yang imutabel atau tag semantik persis (`?ref=v5.1.2`), tinjau diff modul sebelum memperbarui, dan verifikasi checksum provider lewat `.terraform.lock.hcl`.",
          "Untuk tata kelola organisasi, **Policy-as-Code** menegakkan aturan terhadap `tfplan.json` sebelum `apply`. **Open Policy Agent (OPA)** melalui `conftest` atau kebijakan Rego di `trivy` berjalan secara open-source di pipeline CI mana pun. **HashiCorp Sentinel** menyediakan pemeriksaan kebijakan terintegrasi di dalam paket berbayar HCP Terraform dan Terraform Enterprise.",
        ],
      },
      code: {
        language: "rego",
        caption: {
          en: "Illustrative OPA Rego policy blocking unencrypted S3 buckets in tfplan.json",
          id: "Ilustrasi kebijakan OPA Rego untuk memblokir bucket S3 tanpa enkripsi di tfplan.json",
        },
        snippet: `package terraform.security

deny[msg] {
  resource := input.resource_changes[_]
  resource.type == "aws_s3_bucket_server_side_encryption_configuration"
  rule := resource.change.after.rule[_]
  not rule.apply_server_side_encryption_by_default[_].sse_algorithm
  msg := sprintf("S3 encryption missing on %s", [resource.address])
}`,
      },
    },
    {
      id: "advanced-terraform-engineering",
      title: {
        en: "12. Advanced Internals: DAG Parallelism, Blast Radius, and Drift",
        id: "12. Internal Lanjutan: Paralelisme DAG, Blast Radius, dan Drift",
      },
      paragraphs: {
        en: [
          "Terraform walks its resource DAG concurrently using a default worker pool of `10` (`-parallelism=10`). Increasing parallelism speeds up large plans, but setting it too high triggers cloud API rate limits (`429 TooManyRequests`) or overwhelms small self-hosted APIs. The real scalability lever is **state boundaries**: keeping each root state under roughly 100–250 resources so plans complete in seconds and a bad apply cannot lock or corrupt unrelated workloads.",
          "Split state along **rate-of-change and ownership boundaries**: foundational networking and IAM in a slow-moving base layer, shared databases and clusters in a platform layer, and application-specific queues or DNS records in service-owned layers.",
          "At scale, **drift detection** should run on a scheduled non-mutating cron job (`terraform plan -detailed-exitcode`). Exit code `0` means no drift, `1` indicates an error, and `2` signals out-of-band drift that triggers an alert to the owning platform team rather than blindly auto-applying.",
        ],
        id: [
          "Terraform menelusuri DAG resource secara konkuren dengan pool pekerja bawaan `10` (`-parallelism=10`). Menaikkan paralelisme mempercepat plan besar, tetapi nilai terlalu tinggi memicu batas laju API cloud (`429 TooManyRequests`). Pengungkit skalabilitas sesungguhnya adalah **batasan state**: menjaga setiap root state di kisaran 100–250 resource agar plan selesai dalam hitungan detik dan kegagalan apply tidak mengunci beban kerja lain.",
          "Pecah state berdasarkan **laju perubahan dan kepemilikan tim**: jaringan dan IAM fondasi di lapisan dasar yang jarang berubah, database serta klaster bersama di lapisan platform, dan antrean atau DNS aplikasi di lapisan tim layanan.",
          "Pada skala besar, **deteksi drift** harus berjalan sebagai tugas terjadwal non-mutatif (`terraform plan -detailed-exitcode`). Kode keluar `0` berarti tidak ada drift, `1` menandakan galat, dan `2` menandakan drift manual yang mengirim peringatan ke tim platform alih-alih melakukan auto-apply secara membabi buta.",
        ],
      },
    },
    {
      id: "cost-reliability-disaster-recovery",
      title: {
        en: "13. Cost Estimation, Reliability, and Disaster Recovery",
        id: "13. Estimasi Biaya, Keandalan, dan Pemulihan Bencana",
      },
      paragraphs: {
        en: [
          "Infrastructure changes carry direct financial consequences. **Infracost** parses HCL or `tfplan.json` in CI (`infracost-ci diff`) and posts the exact monthly cost delta onto pull requests before merge. For usage-based services (Lambda invocations, NAT Gateway data processing, S3 storage), pair it with `infracost-usage.yml` so teams catch accidental NAT Gateway or oversized RDS changes during code review.",
          'For **Disaster Recovery (DR)**, distinguish between **state recovery** and **infrastructure recovery**. Enabling object versioning and cross-region replication on your remote state bucket protects against accidental state deletion (low RPO for state metadata). Infrastructure recovery relies on keeping modules parameterized by region, avoiding hardcoded region-specific AMI IDs (look them up dynamically via `data "aws_ami"`), and regularly testing cold-start provisioning in a secondary region to verify your actual RTO.',
        ],
        id: [
          "Setiap perubahan infrastruktur berdampak langsung pada biaya. **Infracost** mem-parsing HCL atau `tfplan.json` di CI (`infracost-ci diff`) lalu menempelkan selisih biaya bulanan ke pull request sebelum merge. Untuk layanan berbasis pemakaian (eksekusi Lambda, trafik NAT Gateway, penyimpanan S3), padukan dengan `infracost-usage.yml` agar perubahan mahal tertangkap saat code review.",
          'Untuk **Disaster Recovery (DR)**, bedakan antara **pemulihan state** dan **pemulihan infrastruktur**. Mengaktifkan object versioning dan replikasi lintas region pada bucket state melindungi metadata dari penghapusan tak disengaja. Pemulihan infrastruktur bergantung pada modul yang terparameterisasi region, menghindari ID AMI statis (gunakan `data "aws_ami"`), serta menguji provisioning ulang di region cadangan secara berkala untuk memvalidasi RTO nyata.',
        ],
      },
    },
    {
      id: "production-projects-roadmap",
      title: {
        en: "14. Progressive Production Projects & Verification Checklist",
        id: "14. Proyek Produksi Bertahap & Daftar Periksa Verifikasi",
      },
      paragraphs: {
        en: [
          "To internalize these mechanics without incurring unnecessary cloud bills, work through a progressive 10-stage build sequence. Start with local/free-tier resources (`local_file`, `docker_container`, or AWS Free Tier VPC/S3), then layer remote state, modularity, CI/CD, security gates, and FinOps:",
          "1. **Bootstrap & CLI Hygiene**: Install Terraform via `tenv`, configure `TF_PLUGIN_CACHE_DIR`, and lock multi-platform hashes with `terraform providers lock`.\n2. **VPC & Subnets**: Build a multi-AZ VPC using `for_each` over subnet CIDR maps and `cidrsubnet()`.\n3. **Remote State & Locking**: Provision a versioned S3/GCS/Azure state bucket with `use_lockfile = true` (or native GCS/Blob locks).\n4. **Reusable Module**: Extract the VPC into `modules/network-vpc` with typed `object(...)` variables and `validation` blocks.\n5. **Environment Isolation**: Separate `dev` and `prod` directories with distinct backend keys and pinned module tags.\n6. **Declarative Import**: Create a bucket manually, then adopt it cleanly using an `import` block.\n7. **Native Unit Tests**: Write `tests/vpc.tftest.hcl` using `mock_provider` and run `terraform test`.\n8. **OIDC GitHub Actions**: Wire PR `plan` (read-only OIDC) and gated `apply` on `main`.\n9. **Security & Policy Gate**: Add `tflint`, `trivy config`, and an OPA Rego check against `tfplan.json`.\n10. **FinOps & DR**: Add `infracost-ci` to PRs and enable cross-region replication on the state bucket. Always run `terraform destroy` on sandbox labs immediately after verification.",
        ],
        id: [
          "Untuk menguasai mekanika ini tanpa membengkakkan tagihan cloud, kerjakan urutan proyek 10 tahap secara bertahap. Mulai dari resource lokal/gratis (`local_file`, `docker_container`, atau AWS Free Tier VPC/S3), lalu tambahkan remote state, modularitas, CI/CD, gerbang keamanan, dan FinOps:",
          "1. **Bootstrap & Kebersihan CLI**: Pasang Terraform lewat `tenv`, atur `TF_PLUGIN_CACHE_DIR`, dan kunci hash lintas platform dengan `terraform providers lock`.\n2. **VPC & Subnet**: Bangun VPC multi-AZ memakai `for_each` pada map CIDR dan fungsi `cidrsubnet()`.\n3. **Remote State & Locking**: Siapkan bucket state berversi dengan `use_lockfile = true` (atau lock bawaan GCS/Blob).\n4. **Modul Reusable**: Ekstrak VPC ke `modules/network-vpc` dengan variabel `object(...)` bertipe dan blok `validation`.\n5. **Isolasi Lingkungan**: Pisahkan direktori `dev` dan `prod` dengan kunci backend dan tag modul masing-masing.\n6. **Import Deklaratif**: Buat satu bucket secara manual, lalu adopsi menggunakan blok `import`.\n7. **Unit Test Native**: Tulis `tests/vpc.tftest.hcl` memakai `mock_provider` dan jalankan `terraform test`.\n8. **GitHub Actions OIDC**: Hubungkan PR `plan` (OIDC read-only) dan `apply` berpenjaga di `main`.\n9. **Gerbang Keamanan & Kebijakan**: Tambahkan `tflint`, `trivy config`, dan aturan OPA Rego terhadap `tfplan.json`.\n10. **FinOps & DR**: Pasang `infracost-ci` di PR dan aktifkan replikasi lintas region pada bucket state. Selalu jalankan `terraform destroy` di lab sandbox setelah verifikasi.",
        ],
      },
      checklist: {
        en: [
          "`.terraform.lock.hcl` is committed with hashes for both developer and CI platforms.",
          "Remote state backend has versioning, encryption at rest, and atomic locking enabled.",
          "Zero static cloud access keys exist in `.tf`, `.tfvars`, or CI environment variables (OIDC/Managed Identity only).",
          "No secrets are persisted in plaintext state (mitigated via `ephemeral` blocks or OpenTofu state encryption).",
          "All PRs run `fmt`, `validate`, `tflint`, `trivy config`, and `infracost` before human approval.",
        ],
        id: [
          "`.terraform.lock.hcl` di-commit berisi hash untuk platform developer maupun runner CI.",
          "Remote state backend mengaktifkan versioning, enkripsi at-rest, dan locking atomik.",
          "Tidak ada access key cloud statis di `.tf`, `.tfvars`, atau variabel CI (hanya OIDC/Managed Identity).",
          "Tidak ada rahasia tersimpan sebagai teks polos di state (dimitigasi dengan blok `ephemeral` atau enkripsi state OpenTofu).",
          "Seluruh PR menjalankan `fmt`, `validate`, `tflint`, `trivy config`, dan `infracost` sebelum disetujui.",
        ],
      },
    },
    {
      id: "references-and-further-reading",
      title: {
        en: "15. References & Further Reading",
        id: "15. Referensi & Bacaan Lanjutan",
      },
      paragraphs: {
        en: [
          "1. **roadmap.sh Terraform Roadmap** — Primary curriculum structure and dependency map: [roadmap.sh/terraform](https://roadmap.sh/terraform)",
          "2. **HashiCorp Terraform Documentation** — Official CLI, Language (HCL), State Locking, S3 `use_lockfile`, Ephemeral Values, and Native Testing (`terraform test`): [developer.hashicorp.com/terraform/docs](https://developer.hashicorp.com/terraform/docs)",
          "3. **AWS Prescriptive Guidance** — Best practices for AWS Terraform Provider & IAM OIDC run-phase separation: [docs.aws.amazon.com/prescriptive-guidance](https://docs.aws.amazon.com/prescriptive-guidance/)",
          "4. **Google Cloud Terraform Best Practices** — Module organization, GCS remote state, and Workload Identity Federation: [cloud.google.com/docs/terraform/best-practices-for-terraform](https://cloud.google.com/docs/terraform/best-practices-for-terraform)",
          "5. **Microsoft Azure Terraform Documentation** — `azurerm` backend with Microsoft Entra ID & Managed Identity: [learn.microsoft.com/en-us/azure/developer/terraform](https://learn.microsoft.com/en-us/azure/developer/terraform/)",
          "6. **OpenTofu Documentation** — Client-side state encryption and early variable evaluation: [opentofu.org/docs](https://opentofu.org/docs/)",
          "7. **Terragrunt Documentation** — Units, Stacks (`terragrunt.stack.hcl`), and DRY multi-environment orchestration: [terragrunt.gruntwork.io/docs](https://terragrunt.gruntwork.io/docs/)",
          "8. **Aqua Security Trivy & Infracost** — IaC misconfiguration scanning and PR cost estimation: [trivy.dev](https://trivy.dev/) | [infracost.io/docs](https://www.infracost.io/docs/)",
        ],
        id: [
          "1. **roadmap.sh Terraform Roadmap** — Struktur kurikulum utama dan peta dependensi belajar: [roadmap.sh/terraform](https://roadmap.sh/terraform)",
          "2. **Dokumentasi Resmi HashiCorp Terraform** — CLI, Bahasa HCL, State Locking, S3 `use_lockfile`, Ephemeral Values, dan Native Testing (`terraform test`): [developer.hashicorp.com/terraform/docs](https://developer.hashicorp.com/terraform/docs)",
          "3. **AWS Prescriptive Guidance** — Praktik terbaik Terraform AWS Provider & pemisahan fase run IAM OIDC: [docs.aws.amazon.com/prescriptive-guidance](https://docs.aws.amazon.com/prescriptive-guidance/)",
          "4. **Google Cloud Terraform Best Practices** — Organisasi modul, remote state GCS, dan Workload Identity Federation: [cloud.google.com/docs/terraform/best-practices-for-terraform](https://cloud.google.com/docs/terraform/best-practices-for-terraform)",
          "5. **Dokumentasi Terraform Microsoft Azure** — Backend `azurerm` dengan Microsoft Entra ID & Managed Identity: [learn.microsoft.com/en-us/azure/developer/terraform](https://learn.microsoft.com/en-us/azure/developer/terraform/)",
          "6. **Dokumentasi OpenTofu** — Enkripsi state sisi klien dan evaluasi variabel awal: [opentofu.org/docs](https://opentofu.org/docs/)",
          "7. **Dokumentasi Terragrunt** — Units, Stacks (`terragrunt.stack.hcl`), dan orkestrasi multi-lingkungan DRY: [terragrunt.gruntwork.io/docs](https://terragrunt.gruntwork.io/docs/)",
          "8. **Aqua Security Trivy & Infracost** — Pemindaian salah konfigurasi IaC dan estimasi biaya PR: [trivy.dev](https://trivy.dev/) | [infracost.io/docs](https://www.infracost.io/docs/)",
        ],
      },
    },
  ],
};
