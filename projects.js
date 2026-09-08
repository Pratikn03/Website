"use strict";

// Grounded in the author's manuscripts, project notes, and public READMEs.
window.PORTFOLIO = {
  username: "Pratikn03",
  projects: [
    {
      id: "kbound", title: "K-Bound", category: "research", label: "TRUSTWORTHY MACHINE LEARNING", type: "Research manuscript", repo: "K-Bound", art: "frontier", colors: ["#0b1e4d", "#e8efff"], artLabel: "ADAPT / FREEZE / ABSTAIN", tags: ["PyTorch", "Test-time adaptation", "Lean 4"],
      summary: "Can we tell whether an AI update will help when we don’t have the answers? Sometimes the honest answer is no.",
      question: "A model encounters shifted data, but the correct answers are unavailable. What evidence is enough to support changing its behavior, and when should it admit that it does not know?",
      approach: "K-Bound studies the sign of adaptation benefit across possibilities consistent with a stated uncertainty class. KGA is a separate empirical decision layer that uses a frozen benefit estimator and calibrated residual intervals to advise adapt, freeze, or abstain. It is designed to sit around candidate adapters such as Tent, EATA, and SAR.",
      deliverables: ["A theoretical frontier and impossibility results separating supported and unresolved adaptation decisions under a declared model class.", "A Python decision layer, validation rules, and protocol-specific research runners.", "Research manuscripts, scoped Lean formalization, and reproducibility artifacts."],
      status: "Research manuscript. Theoretical statements require their declared assumptions; empirical decisions require justified interval coverage. Neither implies universal gains under distribution shift.",
      paper: "https://github.com/Pratikn03/K-Bound/blob/main/docs/research/kbound/release/current/kbound_short_main.pdf", paperLabel: "Read main paper"
    },
    {
      id: "orius", title: "ORIUS / GridPulse", category: "research", label: "PHYSICAL AI & RUNTIME SAFETY", type: "Research monograph", repo: "Capstone_Projects", art: "signal", colors: ["#d92d43", "#ffffff"], artLabel: "OBSERVE / REPAIR / CERTIFY", tags: ["Python", "Uncertainty", "Runtime assurance"],
      summary: "Exploring how a controller can make safer decisions when its sensors are noisy, late, or wrong.",
      question: "What if a controller believes an action is safe only because its sensors are wrong? ORIUS studies the gap between safety on an observed state and safety in the underlying physical system.",
      approach: "The runtime connects observation-quality signals to uncertainty, constraint tightening, action repair, and fallback. DomainAdapter defines domain-specific safety and repair semantics; CertOS records the lifecycle and release of auditable certificates.",
      deliverables: ["A battery-dispatch reference implementation with degraded-telemetry replay.", "Additional bounded studies in autonomous-vehicle replay and retrospective healthcare monitoring.", "A research monograph, runtime implementations, and publication-facing audit artifacts."],
      status: "Research program and monograph. Battery is the deepest reference case. The autonomous-vehicle and healthcare studies have narrower contracts and different levels of supporting evidence.",
      paper: "https://github.com/Pratikn03/Capstone_Projects/blob/main/paper/paper.pdf", paperLabel: "Read monograph"
    },
    {
      id: "automl", title: "Leakage-Audited AutoML", category: "research", label: "EVALUATION & REPRODUCIBILITY", type: "Technical report", repo: "Auto_ML", art: "pipeline", colors: ["#edf2ff", "#2350d8"], artLabel: "AUDIT / COMPARE / EXPLAIN", tags: ["scikit-learn", "SHAP", "AutoML"],
      summary: "Making model comparisons fair, so a good score actually means something.",
      question: "Can a high benchmark score be trusted if data leaks across folds or competitors get different budgets? This work makes evaluation integrity part of the experiment itself.",
      approach: "Leakage audits check duplicates, groups, time, and label/path signals. Preprocessing stays within training folds. Shared splits, seeds, and budgets support comparisons across AutoML frameworks and boosting baselines, alongside feature ablations and statistical reporting.",
      deliverables: ["Reproducible benchmark code with automated guardrails and fold-safe preprocessing.", "SHAP explanations, feature ablations, and deployment-aware evaluation outputs.", "A written technical report, Streamlit leaderboard, and FastAPI serving interface."],
      status: "Technical report and reproducible benchmark project. Results are tied to the documented datasets, protocols, and budgets.",
      paper: "https://github.com/Pratikn03/Auto_ML/blob/main/docs/AutoML.pdf", paperLabel: "Read report"
    },
    {
      id: "elara", title: "ELARA", category: "research", label: "MULTIMODAL RELIABILITY", type: "Research draft", repo: null, art: "fusion", colors: ["#2350d8", "#ffffff"], artLabel: "SIGNALS / RELIABILITY / FUSION", tags: ["Multimodal ML", "Anomaly detection", "Drift"],
      summary: "Exploring which signals to trust when an AI system uses several kinds of input.",
      question: "When different modalities become unreliable in different ways, how should an anomaly-detection system decide which signals to trust?",
      approach: "ELARA explores reliability-gated multimodal anomaly fusion under distribution drift. Its central idea is to use reliability signals to guide how modalities are combined instead of giving every input the same authority.",
      deliverables: ["A research draft on reliability-gated multimodal anomaly fusion.", "A research direction connecting multimodal perception, drift, and uncertainty-aware decisions."],
      status: "Draft available on request. Get in touch if you’d like to read it or discuss the idea.",
      paper: "mailto:pratik.niroula@mnsu.edu?subject=ELARA%20manuscript%20request", paperLabel: "Request manuscript"
    },
    {
      id: "sentifargo", title: "Sentifargo", category: "ai", label: "MULTIMODAL AI ENGINEERING", type: "Application project", repo: "Cis380", art: "network", colors: ["#10275d", "#a8c2ff"], artLabel: "RETRIEVE / ROUTE / REASON", tags: ["Next.js", "Kotlin / GraphQL", "FastAPI"],
      summary: "Bringing document search, risk analysis, and other AI tools into one application.",
      question: "How can many specialized AI capabilities become one coherent application, with a clear connection between the interface, service contracts, and underlying models?",
      approach: "A Next.js interface communicates through a Kotlin/Spring GraphQL gateway to Python ML services. The project brings together risk and anomaly workflows, multimodal processing, and document question answering. Hybrid retrieval combines dense embeddings with BM25 before merging and reranking context.",
      deliverables: ["A Next.js application, typed GraphQL gateway, and modular Python services.", "Retrieval, risk-intelligence, recommendation, and media-oriented workflows.", "Container configurations, quality tooling, and documentation for the system's service boundaries."],
      status: "Engineering project. The canonical frontend is Next.js and the gateway is Kotlin/Spring GraphQL; earlier UI implementations remain in the repository as legacy surfaces."
    },
    {
      id: "omnichatx", title: "OmniChatX", category: "ai", label: "AGENTS & RETRIEVAL", type: "Application project", repo: "Recommnder_System", art: "routing", colors: ["#ffedf0", "#c9243d"], artLabel: "ONE INTERFACE / MANY TOOLS", tags: ["RAG", "Agent routing", "Streamlit"],
      summary: "An assistant that picks a tool for your question, from document search to specialized models.",
      question: "Can one conversational interface select the right tool for document questions, recommendations, and domain-specific anomaly queries?",
      approach: "An orchestrator routes requests between LLM reasoning, a document retrieval pipeline, and specialized fraud, cyber, behavior, and recommendation modules. FastAPI exposes the capabilities, while a Streamlit interface provides the conversational surface.",
      deliverables: ["An agent-routing layer and document retrieval pipeline.", "Specialized model modules with a shared API surface.", "A conversational interface and model-training scripts."],
      status: "Application project with code, setup instructions, and ideas for future work on GitHub."
    },
    {
      id: "socialsense", title: "SocialSense-SLM", category: "ai", label: "PRIVACY & EXPLAINABLE AI", type: "Application project", repo: "GropAI", art: "privacy", colors: ["#eaf0ff", "#1d43b6"], artLabel: "PRIVACY / UTILITY / CONTEXT", tags: ["LightGBM", "ONNX", "RAG"],
      summary: "Combining machine learning and document search while looking closely at privacy and explanations.",
      question: "How can an ML application make data leakage, privacy trade-offs, and the relationship between explanations and retrieved evidence visible?",
      approach: "The project combines tabular AutoML, vision inference, and SBERT-based retrieval. It includes leakage audits, SHAP explanations, consent-aware image blurring, and privacy-utility sweeps. Versioned feature snapshots and run configurations support reproducibility.",
      deliverables: ["Tabular training and explainability workflows with leakage guardrails.", "A vision-to-ONNX path and image privacy experiments.", "Retrieval APIs, governance-risk reporting, and a feature-store-oriented workflow."],
      status: "An application and experimentation project. The repository explains the privacy controls and how its evaluations are set up."
    },
    {
      id: "tradeguard", title: "TradeGuard", category: "software", label: "CONTROL SYSTEMS & SOFTWARE", type: "Engineering project", repo: "Trading", art: "control", colors: ["#d92d43", "#ffffff"], artLabel: "RECONCILE / VERIFY / CONTROL", tags: ["React / TypeScript", "PostgreSQL", "FastAPI"],
      summary: "A paper-trading dashboard with clear controls, a separate worker, and a way to stop it.",
      question: "How can a single-operator trading application separate the dashboard from execution while keeping decisions, commands, and risk controls auditable?",
      approach: "A FastAPI backend handles access and control commands. A separate worker owns reconciliation, strategy evaluation, verifier checks, and the persistent kill switch. PostgreSQL stores state and audit records; a React/TypeScript interface presents the control surface.",
      deliverables: ["A React dashboard and FastAPI control API.", "An independent worker, portfolio-percent risk controls, and durable stop behavior.", "Database migrations, operator-access controls, and a production runbook."],
      status: "A personal engineering project built around paper trading."
    }
  ],
  repositories: [
    { name: "Website", language: "HTML / CSS / JavaScript", description: "My portfolio: a bit about me, the projects I’m working on, and the writing behind them." },
    { name: "K-Bound", language: "Python", description: "Research on supported adaptation decisions without target labels." },
    { name: "Cis483", language: "Web coursework", description: "Web Application Design and Development assignments at Minnesota State University, Mankato." },
    { name: "Capstone_Projects", language: "Python", description: "ORIUS: observation-aware runtime safety for physical AI." },
    { name: "Trading", language: "Python", description: "TradeGuard: a paper-first trading control system and operator dashboard." },
    { name: "Cis380", language: "Python / Kotlin / TypeScript", description: "Sentifargo: multimodal risk intelligence, retrieval, and application services." },
    { name: "Auto_ML", language: "Python", description: "Leakage-audited AutoML benchmarks, explanations, and reproducibility." },
    { name: "RESERACH", language: "Repository archive", description: "Additional research repository. Browse the source and history on GitHub." },
    { name: "elite-engineering-900", language: "Python", description: "Engineering practice repository. Explore the exercises and source on GitHub." },
    { name: "Recommnder_System", language: "Jupyter Notebook", description: "OmniChatX: multi-domain agent routing, retrieval, and specialized ML modules." },
    { name: "GropAI", language: "Python", description: "SocialSense-SLM: multimodal AutoML, privacy experiments, and retrieval." },
    { name: "AutoML", language: "Repository archive", description: "An earlier AutoML repository. The maintained benchmark is linked above as Auto_ML." },
    { name: "localrepo", language: "Repository archive", description: "Earlier repository. Browse the files and commit history on GitHub." },
    { name: "Pratik_n09", language: "Repository archive", description: "Earlier repository. Browse the files and commit history on GitHub." }
  ]
};
