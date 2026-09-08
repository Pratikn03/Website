// Editorial content for the static project pages. Keep claims tied to the sources below.
const github = (name, path = "") => `https://github.com/Pratikn03/${name}${path ? `/blob/main/${path}` : ""}`;
const source = (title, href, description) => ({ title, href, description });

export default {
  kbound: {
    displayTitle: "K-Bound",
    subtitle: "Knowing when not to update an AI model.",
    kind: "Machine learning research",
    stage: "Research manuscript + implementation",
    mapTitle: "An update is not always an improvement.",
    map: [
      ["A model meets unfamiliar data", "The correct answers are not available at decision time."],
      ["Ask what the evidence supports", "Separate a theoretical limit from an empirical estimate."],
      ["Adapt, freeze, or abstain", "Do not turn missing evidence into permission to change."]
    ],
    questionTitle: "Can the model know that a change will help?",
    question: [
      "A model can work well on the data it was trained on and struggle when the world changes. Test-time adaptation tries to respond by updating the model using the new inputs. The difficult part is that those inputs often arrive without correct labels. We can see that something changed, but not necessarily whether an update makes the predictions better.",
      "K-Bound starts with that gap. Two possible situations can look identical through the available observations while making the same update helpful in one case and harmful in the other. If the evidence cannot distinguish those situations, confidence alone does not solve the problem.",
      "The project asks a narrower, more useful question than whether adaptation is always good: under an explicitly stated set of assumptions, when is there enough information to commit to a decision? When there is not, keeping the original predictor or declining to make a recommendation is part of the design, not a failure to produce an answer."
    ],
    callout: "An impossibility result is not saying that learning is hopeless. It is saying which extra information a decision would need.",
    approachTitle: "Two ideas, with two different sets of assumptions.",
    approach: [
      "The theoretical result and the practical KGA decision layer answer related questions, but they are not interchangeable. The theory describes a decision frontier over a declared uncertainty class. KGA estimates whether a particular candidate update will help, using calibration evidence from earlier labeled cases."
    ],
    steps: [
      ["State the theoretical uncertainty class", "The frontier is written as |M| > beta in the manuscript. Its meaning depends on a specified disagreement-conditional calibration-residual class. It is not an unrestricted promise about every kind of distribution shift."],
      ["Keep the unresolved region explicit", "Within the stated model, the unresolved region supports abstention rather than an unjustified choice. This is the theoretical part of the story; it does not automatically supply the empirical calibration evidence used by KGA."],
      ["Estimate a candidate update's benefit", "KGA uses a frozen estimator and label-free features to predict an evaluation-cell benefit. Residual calibration supplies an interval around that estimate. Candidates such as Tent, EATA, and SAR need their own locks and calibration."],
      ["Require a positive lower bound before adapting", "The practical rule permits adaptation when the calibrated lower benefit bound is above zero. Its interpretation is only as strong as the interval coverage for the quantity being estimated."],
      ["Refuse unsupported decisions", "The service has an abstention path that retains the frozen predictor when evidence is unavailable. Invalid inputs can be rejected before a decision is made. A diagnostic score by itself is not a certificate."]
    ],
    insideTitle: "From a research question to inspectable artifacts.",
    inside: "The repository contains more than a paper. It separates the maintained decision package, formal material, experimental runners, and locked research evidence so that each can be examined on its own terms.",
    components: [
      ["Decision layer", "The maintained Python package exposes the practical KGA interface and command-line tools. Older research-package paths are not automatically equivalent deployment surfaces.", "kga/"],
      ["Formal scope", "Lean material covers a scoped finite core and measurable layers. The formal audit documents boundaries rather than treating the entire project as a universally machine-checked guarantee.", "docs/research/kbound/formal/"],
      ["Experiments and locks", "Adaptation runners and research locks keep candidate choices, calibration, and evaluation protocols visible. Changing a candidate or protocol can change which evidence remains applicable.", "experiments/kbound/ + research_lock/"],
      ["Research writing", "The main paper and full report explain the assumptions, theoretical frontier, empirical construction, and limitations at different levels of detail.", "docs/research/kbound/release/current/"]
    ],
    evidenceTitle: "The limits belong next to the results.",
    evidence: [
      "The repository distinguishes controlled benchmark findings from natural-shift evidence. Some controlled comparisons have favorable point estimates, but the README does not present them as a confirmatory, universal adaptation win. The natural-data studies also include ties, one-sided decisions, negative development evidence, and withheld results.",
      "That distinction matters. Avoiding a harmful update can be useful even when it does not outperform always keeping the original model. Likewise, an interval for an evaluation-cell outcome does not automatically establish a population guarantee or protect an indefinitely repeated deployment."
    ],
    statusTitle: "A bounded research claim, not an always-better adapter.",
    limits: [
      "The theoretical frontier is conditional on the manuscript's declared class and assumptions.",
      "KGA's empirical decision requires appropriate calibration coverage for the actual target quantity.",
      "The current README does not claim a valid natural-dataset, confidence-supported win over both always-adapt and always-freeze.",
      "A manuscript, formal artifact, or diagnostic API endpoint should not be presented as a blanket deployment safety certificate."
    ],
    takeawayTitle: "Make room for an honest answer.",
    takeaway: [
      "What I care about here is the connection between a mathematical limit and a software decision. If an assumption is necessary in the theorem, the interface should not quietly forget it. If calibration evidence is missing, the system should not behave as though the evidence exists.",
      "K-Bound represents the research side of my work: defining a question carefully, building a practical method alongside it, and keeping the boundary between the two visible. The useful outcome is not just another update rule. It is a clearer account of when an update is justified."
    ],
    closing: "Sometimes the most useful thing an AI system can say is: I do not have enough evidence to change.",
    resources: [
      source("Project overview and evidence scope", github("K-Bound"), "Start with the README for the current separation of theory, empirical results, and claim boundaries."),
      source("Formal development", github("K-Bound", "docs/research/kbound/formal/README.md"), "Read what the Lean development covers and how its scope is described."),
      source("Full research report", github("K-Bound", "docs/research/kbound/release/current/kbound_full_report.pdf"), "The longer companion to the main manuscript, including supporting material.")
    ]
  },
  orius: {
    displayTitle: "ORIUS",
    subtitle: "What if the controller's picture of the world is wrong?",
    kind: "Runtime safety research / GridPulse",
    stage: "Research monograph + reference system",
    mapTitle: "A safe-looking reading is not the whole story.",
    map: [
      ["A sensor reports a state", "Measurements can be delayed, noisy, missing, or degraded."],
      ["Represent what is uncertain", "Use observation quality to constrain the next action."],
      ["Repair, fall back, and record", "Release an action with an inspectable decision trail."]
    ],
    questionTitle: "Safe according to which measurement?",
    question: [
      "Controllers make decisions from observations. A battery controller, for example, needs a useful estimate of the battery's state before deciding how to charge or discharge. But an observation is not the physical state itself. If the measurement is stale or unreliable, an action that looks safe on screen may not be safe for the actual system.",
      "ORIUS studies this observation-to-reality gap. Instead of assuming the sensor reading is correct and checking the action afterward, it brings measurement reliability into the decision process before the action is released.",
      "The project connects uncertainty estimation, constrained actions, repair, fallback behavior, and audit records. Battery dispatch is the primary reference implementation. Vehicle replay and retrospective healthcare monitoring are additional studies, with different contracts and different levels of supporting evidence."
    ],
    callout: "The question is not just whether an action fits the measured state. It is whether it remains acceptable for the states that measurement could represent.",
    approachTitle: "Check the observation before trusting the action.",
    approach: [
      "The universal kernel defines a common sequence, while a DomainAdapter supplies the details that depend on the physical or monitoring domain. The uncertainty set and safe action set are not decorative confidence scores; they connect a questionable observation to a more cautious action."
    ],
    steps: [
      ["Ingest telemetry and assess quality", "The runtime turns raw telemetry into a usable observation packet. Observation-quality evaluation adds reliability information and degradation flags rather than treating every packet as equally trustworthy."],
      ["Build an observation-consistent uncertainty set", "The system represents plausible states behind the observation. Reliability loss can widen that set, making the uncertainty relevant to the control decision instead of leaving it in a separate dashboard."],
      ["Tighten the available actions", "Domain-specific constraints determine which actions remain acceptable for the current uncertainty set. The core interfaces stay domain-neutral; battery or vehicle details belong in adapters."],
      ["Repair or use a defined fallback", "A proposed action can be repaired into the allowable set. Fallback behavior is also domain-specific: the meaning of holding a battery command is not the same as a vehicle brake-hold contract."],
      ["Record the decision and its context", "The certificate records the released action alongside uncertainty, reliability, and causal metadata. The governance layer addresses certificate lifecycle, audit continuity, and claim authority."]
    ],
    insideTitle: "A kernel, adapters, and an audit trail.",
    inside: "The architecture separates shared reasoning from domain behavior. That separation is important because a common software interface is not, by itself, proof that every connected domain has the same safety argument.",
    components: [
      ["Runtime core", "Typed contracts, quality handling, uncertainty construction, and decision semantics form the shared runtime layer.", "src/orius/dc3s/ + src/orius/universal_theory/"],
      ["Domain adapters", "Adapters define telemetry interpretation, plant constraints, repair, and fallback behavior. Battery-specific assumptions stay outside the domain-neutral core.", "src/orius/adapters/ + src/orius/universal_framework/"],
      ["Replay and benchmarks", "The benchmark layer describes fault models, replay records, metrics, and latency or audit summaries, making the experimental setting part of the result.", "src/orius/orius_bench/"],
      ["Certificates and application", "CertOS addresses lifecycle and audit continuity. A FastAPI service and Next.js frontend expose application and research surfaces around the system.", "src/orius/certos/ + services/api/ + frontend/"]
    ],
    evidenceTitle: "A reference implementation is not every deployment.",
    evidence: [
      "Battery dispatch has the deepest reference implementation in the project. The architecture also names evidence tiers so that an experimental adapter, a synthetic portability study, and a defended application are not all described as equally established.",
      "The vehicle study is a bounded replay and runtime-contract setting, not a claim to solve autonomous driving. The healthcare work is retrospective monitoring, not authorization for clinical use. The publication and reproducibility documents are the place to inspect the exact settings behind the reported results."
    ],
    statusTitle: "Read the domain contract before the safety claim.",
    limits: [
      "Observation quality, uncertainty construction, and constraint assumptions all affect what a released action means.",
      "Evidence strength differs by domain. Porting an adapter does not automatically transfer a proof or an empirical guarantee.",
      "The project is not presented here as a certified autonomous-driving or regulated clinical system.",
      "This overview describes the documented architecture; it does not independently reproduce the domain experiments."
    ],
    takeawayTitle: "Reliability should change the decision.",
    takeaway: [
      "The idea I want to make tangible is simple: if the system becomes less sure about its view of the world, its behavior should reflect that uncertainty. A warning light that never changes the permitted action is not the same thing as a reliability-aware controller.",
      "ORIUS brings together the research and engineering sides of that idea. The mathematical assumptions, runtime adapter, repair path, and audit record all need to tell a consistent story about why a particular action was allowed."
    ],
    closing: "When the observations become less trustworthy, the system should become more careful, not merely more verbose.",
    resources: [
      source("ORIUS project and domain scope", github("Capstone_Projects"), "The project README explains the reference domain, additional studies, and current manuscript."),
      source("Universal kernel architecture", github("Capstone_Projects", "docs/UNIVERSAL_KERNEL_ARCHITECTURE.md"), "The runtime flow, logical layers, DomainAdapter boundary, and evidence tiers."),
      source("Reproducibility guide", github("Capstone_Projects", "ORIUS_REPRODUCIBILITY.md"), "Start here to understand how the research artifacts and reproduction workflow fit together.")
    ]
  },
  automl: {
    displayTitle: "AutoML",
    subtitle: "A good score should survive a fair comparison.",
    kind: "Evaluation and AutoML research",
    stage: "Technical report + benchmark pipeline",
    mapTitle: "Before choosing the winner, check the race.",
    map: [
      ["Define a fair experiment", "Fix the split, seed, evaluation metric, and budget."],
      ["Keep the answers out of training", "Audit leakage and fit preprocessing inside each fold."],
      ["Compare more than accuracy", "Read uncertainty, explanations, and serving trade-offs."]
    ],
    questionTitle: "Is the model better, or was the test easier?",
    question: [
      "AutoML tools make it easier to search across models and training settings. But automation does not automatically make an experiment trustworthy. If information from the evaluation set slips into preprocessing, or one framework gets a more favorable split or budget, the leaderboard can reward the experimental setup rather than the model.",
      "This project puts the comparison itself under scrutiny. It combines leakage checks, fold-safe preprocessing, shared experiment settings, feature ablations, and statistical reporting around AutoML frameworks and gradient-boosting baselines.",
      "I want the result to be explainable in ordinary terms: what data was used, what the model was allowed to see, how the alternatives were compared, and what trade-offs remain if someone tries to serve the model. A high score is the beginning of that conversation, not the end."
    ],
    callout: "If a model has indirectly seen the answers, a more impressive leaderboard does not make the evaluation more useful.",
    approachTitle: "Make the experiment consistent from the start.",
    approach: [
      "The pipeline is organized around the dataset lifecycle rather than a single winning algorithm. A registry describes each dataset and its split strategy, trainers follow a shared reporting contract, and analysis combines the resulting fold-level artifacts."
    ],
    steps: [
      ["Register the dataset and choose its split", "Metadata records the prediction target and the appropriate evaluation structure. Grouped records and time-ordered observations need different treatment from independent, randomly split examples."],
      ["Audit shortcuts before training", "Guardrails look for issues such as duplicates, time leakage, and information carried through paths or labels. Imputation, scaling, encoding, and other learned preprocessing belong inside the training folds."],
      ["Run comparable model families", "The repository connects AutoML frameworks including H2O, FLAML, AutoGluon, and LightAutoML with XGBoost, LightGBM, and CatBoost baselines. Availability depends on the installed integrations and dependencies."],
      ["Keep the reporting artifacts", "The experiment harness records fold metrics, timing, seeds, and saved models. Analysis includes uncertainty summaries, paired comparisons, and feature ablations rather than only a single average score."],
      ["Connect evaluation to serving", "A Streamlit leaderboard supports exploration. The FastAPI serving surface, model metadata, containers, and monitoring hooks connect a selected artifact to an application workflow."]
    ],
    insideTitle: "One workflow, with inspectable stages.",
    inside: "The architecture documentation provides a code walkthrough from data registration to deployment. The important engineering choice is keeping those stages connected through shared metadata and artifacts instead of a collection of unrelated notebooks.",
    components: [
      ["Data and split governance", "Registry-driven split selection supports ordinary, stratified, grouped, and time-series evaluation. Sanitization and loading utilities prepare data without replacing a thoughtful split policy.", "configs/registry.yaml + Project/utils/splits.py"],
      ["Trainers and experiment harness", "Framework adapters, baseline trainers, seeded evaluation loops, and artifact persistence provide the comparison surface.", "Project/trainers/ + Project/experiments/"],
      ["Explanations and analysis", "SHAP outputs, feature ablations, confidence summaries, and paired differences help explain what changed and how stable the comparison is.", "Project/analysis/ + reports/ + runs/"],
      ["Serving and visibility", "The API exposes prediction and health surfaces. A leaderboard and monitoring scaffolds make the artifacts easier to inspect outside a training script.", "Deploy/api/serve/app.py + Project/streamlit_leaderboard.py"]
    ],
    evidenceTitle: "The setup is part of the result.",
    evidence: [
      "The technical report and repository contain benchmark reporting, but this page does not turn an aggregate accuracy number into a universal ranking. Different datasets, task types, metrics, dependencies, and budgets can produce different winners.",
      "Leakage checks reduce known evaluation risks; they do not prove that every dataset is free of every possible shortcut. Similarly, a confidence interval or paired comparison has to be interpreted alongside the folds, sample structure, and experiment choices that produced it."
    ],
    statusTitle: "A benchmark and deployment toolkit, not a universal winner.",
    limits: [
      "Framework comparisons are only meaningful under the recorded splits, metrics, seeds, and resource budgets.",
      "Optional AutoML integrations require their own dependencies; not every framework is active in every run.",
      "Guardrails and fold-safe preprocessing are safeguards, not proof that all data problems have been eliminated.",
      "Serving infrastructure and monitoring hooks demonstrate an engineering path, not a claim of a currently operated public service."
    ],
    takeawayTitle: "Make the score explainable.",
    takeaway: [
      "The part of AutoML I find most useful is not simply trying more models. It is reducing the distance between a question, a defensible experiment, and an artifact someone else can understand.",
      "This project makes that process explicit. The data policy, model search, explanation, evaluation report, and serving metadata belong to the same story. If the result looks surprisingly good, there should be enough context to ask why."
    ],
    closing: "A smaller improvement from an honest experiment is worth more than a spectacular score from a leaky one.",
    resources: [
      source("Benchmark overview", github("Auto_ML"), "Frameworks, guardrails, feature engineering, explainability, and the documented workflow."),
      source("Architecture and code walkthrough", github("Auto_ML", "docs/ARCHITECTURE.md"), "Follow the implementation from the dataset registry through trainers, reports, and serving."),
      source("Reproducibility guide", github("Auto_ML", "docs/REPRODUCIBILITY.md"), "Consult the repository's environment and experiment instructions before running a comparison.")
    ]
  },
  elara: {
    displayTitle: "ELARA",
    subtitle: "More inputs do not automatically mean better evidence.",
    kind: "Multimodal anomaly-detection research",
    stage: "Research draft / available on request",
    mapTitle: "Different signals can fail differently.",
    map: [
      ["Bring several signals together", "Multiple modalities offer different views of a situation."],
      ["Ask which views remain reliable", "A changing distribution can weaken one input more than another."],
      ["Explore reliability-aware fusion", "The research question is how that should affect the combined decision."]
    ],
    questionTitle: "What should happen when one input stops being useful?",
    question: [
      "Multimodal systems combine different kinds of input. That can be useful because one signal may reveal something another misses. It also introduces a difficult question: what happens when a signal becomes misleading, noisy, or unfamiliar while the other signals remain usable?",
      "ELARA is a research draft about reliability-gated multimodal anomaly fusion under distribution shift. In plain language, it explores how a system could combine unusual-pattern signals without assuming every input deserves the same level of trust in every situation.",
      "The interest is not simply in adding more modalities. It is in understanding what each modality contributes and how that contribution should change when its reliability changes. This page outlines the research direction; it does not announce a completed benchmark or a released production system."
    ],
    callout: "More evidence is useful only if the system has a sensible way to handle evidence that becomes unreliable.",
    approachTitle: "The questions behind reliability-aware fusion.",
    approach: [
      "The draft's central idea is to use reliability signals to guide fusion. The steps below describe the questions that such a design needs to answer, not a claim that a particular implementation or evaluation has already resolved them."
    ],
    steps: [
      ["Understand the contribution of each modality", "A combined anomaly decision needs an account of what the individual inputs measure. Several signals agreeing does not automatically mean they provide independent evidence."],
      ["Distinguish an anomaly from a failing input", "An unusual reading might reflect the event of interest, a degraded sensor, or a changed data distribution. A useful reliability signal must help with that distinction rather than simply flagging anything unfamiliar."],
      ["Make the fusion rule responsive", "Reliability-gated fusion asks how the influence of each input should change as its trustworthiness changes. The exact rule, its assumptions, and its behavior when signals disagree belong in the manuscript."],
      ["Evaluate the difficult cases explicitly", "A meaningful evaluation would need to describe missing, corrupted, and shifted inputs, along with false alarms and missed anomalies. Those are evaluation questions for the research, not results being claimed on this page."]
    ],
    insideTitle: "What the draft is about.",
    inside: "There is no public standalone repository or manuscript linked from this portfolio. Rather than inventing a code map, these are the conceptual pieces of the project description and the details to ask about when requesting the draft.",
    components: [
      ["Multimodal inputs", "Different input types contribute to a shared anomaly-detection question. The manuscript is the place to establish the exact modalities and task setting.", "Research scope"],
      ["Reliability signals", "The project studies how information about input trustworthiness can guide fusion when the distribution changes.", "Central research question"],
      ["Fusion under drift", "The challenge is combining signals while accounting for unequal degradation, rather than treating the combined score as automatically more trustworthy.", "Method direction"],
      ["Assumptions and evaluation", "The precise model, experimental protocol, and evidence need to be read in the draft. This overview intentionally does not substitute invented details for them.", "Discuss with the author"]
    ],
    evidenceTitle: "A draft should look like a draft.",
    evidence: [
      "ELARA is available on request. The public description establishes the topic, but it does not provide enough material here to support numerical performance claims, a theorem statement, or a detailed implementation inventory.",
      "That is why the page stays at the level of the research question and its motivation. If you are interested in collaboration or want to examine the method, requesting the manuscript is a better next step than treating a portfolio summary as the full evidence."
    ],
    statusTitle: "Research in progress, with the manuscript available by email.",
    limits: [
      "No published venue, released implementation, or benchmark result is asserted here.",
      "The conceptual workflow above is explanatory, not a tested demonstration.",
      "Exact modalities, model choices, assumptions, and evaluation details should be established from the current manuscript."
    ],
    takeawayTitle: "Trust the contribution, not just the input count.",
    takeaway: [
      "ELARA connects to a theme across my projects: confidence should depend on the quality of the evidence, not just the amount of machinery used to process it. Combining several inputs creates possibilities, but it also creates more ways to become confidently wrong.",
      "The research direction is to make that uncertainty part of the fusion question itself. I would rather explain what is still being worked out than make an unfinished idea sound settled."
    ],
    closing: "The goal is not to listen to every signal equally. It is to understand which signals still deserve to be heard.",
    resources: [
      source("Ask about the current research scope", "mailto:pratik.niroula@mnsu.edu?subject=ELARA%20research%20discussion", "Get in touch to discuss the draft, its assumptions, and possible collaboration."),
      source("Related work: K-Bound", "../kbound/", "A separate project about what label-free evidence can and cannot justify. This is related work, not an ELARA implementation.")
    ],
    sourceNote: "Based on the project description supplied for this portfolio. ELARA is a draft available on request; a public standalone repository and published results are not linked here."
  },
  sentifargo: {
    displayTitle: "Sentifargo",
    subtitle: "One application. Several very different AI workflows.",
    kind: "Full-stack AI platform",
    stage: "Application code + architecture documentation",
    mapTitle: "Keep the interface coherent and the responsibilities separate.",
    map: [
      ["Next.js application", "The user-facing interface brings the workflows together."],
      ["Kotlin GraphQL gateway", "An explicit API contract sits between the UI and services."],
      ["Python ML and API services", "Domain models, retrieval, and media workflows live behind that boundary."]
    ],
    questionTitle: "How do several AI tools become one usable application?",
    question: [
      "A fraud model, a document-search tool, and a media-analysis workflow do not naturally behave like one product. They accept different inputs, depend on different artifacts, and produce outputs that mean different things. Putting them behind a single screen does not remove those differences.",
      "Sentifargo brings fraud, cyber, behavior, retrieval-augmented generation, and media workflows into a multimodal risk-intelligence application. The project is as much about the boundaries between components as it is about the models themselves.",
      "The current repository identifies a Next.js frontend, a Kotlin and Spring GraphQL gateway, and Python ML/API services as the canonical application stack. That gives the work a clear structure: a user interface, an application contract, and specialized services with their own responsibilities."
    ],
    callout: "A single interface is useful when it makes different tools easier to understand, not when it hides how different their answers are.",
    approachTitle: "Three layers, with a deliberate contract between them.",
    approach: [
      "The source documentation explicitly distinguishes the current stack from a legacy frontend. For this case study, the canonical mapping is more useful than treating every folder in a growing repository as an equally current part of the product."
    ],
    steps: [
      ["Start with the user-facing workflow", "The Next.js application is the canonical frontend. It is the presentation layer for a platform spanning document questions and domain-specific risk or media tasks."],
      ["Use a gateway rather than coupling every screen to every model", "The Kotlin gateway uses Spring GraphQL. Its schema provides an explicit integration surface between frontend requests and the Python runtime."],
      ["Keep specialized processing in the Python services", "The ML and API runtime is organized under app/ and src/. The project covers fraud, cyber, behavior, retrieval, and media workflows, rather than treating a general-purpose language model as the answer to every task."],
      ["Document the operational and model context", "The documentation index includes architecture, security, reproducibility, deployment, audits, and model cards. Those surfaces help a reader distinguish the application structure from a model's evaluation claims."]
    ],
    insideTitle: "More than a chat window.",
    inside: "The repository gives readers several useful starting points. The interface and gateway explain integration; the Python entrypoint explains the runtime; and the documentation maps the supporting data, model, and operational material.",
    components: [
      ["Canonical frontend", "A Next.js application uses the GraphQL-facing stack. The older ui-web/frontend directory is retained for compatibility and reference, not presented as the current production frontend.", "ui-web/next/"],
      ["GraphQL gateway", "A Kotlin and Spring application provides the gateway and schema. This makes the cross-language integration boundary explicit in the codebase.", "services/gateway-kotlin/"],
      ["Python runtime", "FastAPI and the Python service code support the specialized AI workflows. Their behavior and model dependencies should be inspected separately from the visual interface.", "app/main.py + app/ + src/"],
      ["Model and operating documentation", "The documentation index points to model cards, dataset and reproducibility material, security guidance, deployment plans, and audits.", "docs/README.md + docs/CANONICAL.md"]
    ],
    evidenceTitle: "An integration does not validate every prediction.",
    evidence: [
      "The public README establishes the canonical architecture and the breadth of workflows. It does not, by itself, establish one accuracy, safety, or reliability result that applies to every module. Fraud classification, retrieval quality, and media analysis require different evaluations.",
      "This page therefore focuses on the documented engineering structure. The linked model cards and reproducibility documentation are the right next step for examining a specific model. Deployment workflows and infrastructure scaffolds should also be distinguished from evidence that a public service is currently operating."
    ],
    statusTitle: "A documented platform, with module-specific evidence to inspect.",
    limits: [
      "The canonical application path is Next.js to Kotlin GraphQL to Python services; legacy UI folders are not presented as equivalent current surfaces.",
      "No platform-wide accuracy, security guarantee, or production-usage figure is claimed on this page.",
      "A retrieved passage can support an answer, but retrieval alone does not guarantee that the answer is correct.",
      "This is an architecture overview, not a claim that every documented module has been independently rerun or audited here."
    ],
    takeawayTitle: "The boundaries are part of the product.",
    takeaway: [
      "What interests me about Sentifargo is the work between the models: how a request moves through an application, where a contract belongs, and how to keep the interface understandable when the underlying tasks are different.",
      "The project brings together frontend development, typed gateway design, Python services, and model documentation. A useful AI application needs all of those pieces to communicate clearly, including when a module cannot give a reliable answer."
    ],
    closing: "Making several AI tools feel like one application should not make their assumptions disappear.",
    resources: [
      source("Sentifargo repository", github("Cis380"), "The current README establishes the canonical stack, scope, and local setup."),
      source("Canonical source mapping", github("Cis380", "docs/CANONICAL.md"), "Frontend, gateway, API entrypoints, schema, and the explicit legacy policy."),
      source("Documentation and model-card index", github("Cis380", "docs/README.md"), "Architecture, security, reproducibility, deployment, audits, and per-domain model cards.")
    ]
  },
  omnichatx: {
    displayTitle: "OmniChatX",
    subtitle: "Give the question to the tool that can actually answer it.",
    kind: "Agent routing and applied AI",
    stage: "Full-stack application / learning project",
    mapTitle: "Not every question needs the same engine.",
    map: [
      ["A user asks a question", "The assistant needs to understand which kind of task it is."],
      ["The orchestrator selects a route", "Choose document retrieval, a specialist model, or a general LLM."],
      ["Return the result through one interface", "Bring the selected tool's output back to the conversation."]
    ],
    questionTitle: "Why ask a language model to do every job?",
    question: [
      "Some questions call for a conversational answer. Others require finding a passage in a document, scoring a structured example with a trained model, or producing a recommendation. Those tasks may share a chat interface, but the computation behind a useful answer is different.",
      "OmniChatX explores that distinction through a multi-domain assistant. It combines general language-model reasoning, retrieval-augmented generation, and specialized fraud, cyber, behavior, and recommendation modules behind an orchestrator.",
      "The project focuses on the path from a user's request to the appropriate tool and back. It is an end-to-end engineering exercise spanning model training, vector retrieval, API routes, orchestration, and a usable frontend, rather than a claim that a single model can solve all of those domains."
    ],
    callout: "The useful question is not only what the assistant should say. It is which system should produce the answer in the first place.",
    approachTitle: "Route first, then let the right component work.",
    approach: [
      "The README describes a central orchestrator that selects an engine based on the task. A FastAPI backend exposes the service routes, while a Streamlit chatbot is the default user interface. An optional static interface is also included."
    ],
    steps: [
      ["Receive the request in a shared interface", "The chatbot provides the conversational surface and session context. The same interface can lead to different underlying tools depending on the type of request."],
      ["Choose the appropriate route", "The orchestrator maps general questions to an LLM, document questions to retrieval, and specialist inputs to the corresponding domain model. The README identifies agent/orchestrator.py as the central routing entrypoint."],
      ["Retrieve documents or run a specialist model", "The RAG path uses document loading, SentenceTransformers embeddings, and vector search. Other paths invoke fraud, cyber, behavior, or recommendation components with their own inputs and artifacts."],
      ["Bring the selected output back to the conversation", "The orchestrator assembles the response for the frontend. Keeping the route visible is important because a retrieved passage, model score, and generated explanation do not represent the same kind of evidence."]
    ],
    insideTitle: "A small system of specialized parts.",
    inside: "The repository describes the assistant through an explicit module layout. That makes it possible to study routing independently from document retrieval, or a model's training process independently from the chat frontend.",
    components: [
      ["Orchestrator", "The routing layer selects between general conversation, document retrieval, and specialist engines. Supporting utilities cover response formatting and explanation helpers.", "agent/orchestrator.py + agent/"],
      ["Document retrieval", "Loading, embeddings, retrieval, and a vector-store surface provide the RAG workflow. The quality of the answer depends on the available documents and the retrieved context.", "rag/loader.py + rag/embed.py + rag/retriever.py"],
      ["Domain models and API", "The backend exposes chat, RAG, fraud, cyber, behavior, and recommendation routes. Separate training scripts are documented for the specialist models.", "backend/main.py + backend/api/ + src/train/"],
      ["Chat interfaces", "A Streamlit chatbot is the default interface. The repository also describes an optional HTML, CSS, and JavaScript frontend for the application.", "app/streamlit_chatbot/ + ui/"]
    ],
    evidenceTitle: "Keep an integration project separate from a benchmark claim.",
    evidence: [
      "The README documents the intended routes and training datasets, including credit-card and PaySim data for fraud, UNSW-NB15 for cyber, and CERT r4.2 for behavior. Those references describe the project setup; they are not a substitute for task-specific evaluation or permission to apply a model to a new population.",
      "It also lists possible future extensions such as LangGraph, additional memory stores, small-model fine-tuning, and expanded monitoring. Those roadmap items are not presented here as already implemented features."
    ],
    statusTitle: "A multi-tool assistant with a clearly bounded portfolio scope.",
    limits: [
      "A routing decision can be wrong even when every individual tool runs successfully.",
      "Specialized model scores require appropriate input schemas and evaluation in the setting where they are used.",
      "Document retrieval does not make unsupported generated claims automatically factual.",
      "Future extensions in the README remain roadmap items, not evidence of a completed deployment."
    ],
    takeawayTitle: "An agent is also an integration problem.",
    takeaway: [
      "OmniChatX is about the practical structure around an assistant: selecting a tool, supplying the right input, managing the result, and returning something understandable to a user. A compelling chat interaction depends on those ordinary engineering decisions.",
      "The part I want to make clear is that different kinds of intelligence can cooperate without becoming interchangeable. A language model can help explain a result, but it should not erase where that result came from or the conditions under which it makes sense."
    ],
    closing: "A useful assistant knows when to answer, when to retrieve, and when to hand the work to a more specialized tool.",
    resources: [
      source("OmniChatX overview and setup", github("Recommnder_System"), "The README documents routes, modules, model-training entrypoints, and the roadmap."),
      source("Documented module layout", github("Recommnder_System") + "#-project-structure", "See how the orchestrator, backend, retrieval code, models, and interfaces are organized.")
    ]
  },
  socialsense: {
    displayTitle: "SocialSense",
    subtitle: "Build the model. Question the data. Explain the trade-offs.",
    kind: "Multimodal ML, privacy, and retrieval / SLM",
    stage: "Application and experimental workflows",
    mapTitle: "Accuracy is only one part of the picture.",
    map: [
      ["Work with tables, images, and text", "Use different modeling and retrieval paths for different data."],
      ["Make the checks visible", "Inspect leakage, explanations, and privacy-utility choices."],
      ["Keep artifacts and context", "Version the inputs and report what a diagnostic actually means."]
    ],
    questionTitle: "What does a model's score leave out?",
    question: [
      "A useful machine-learning application needs more than a trained model. It also needs an account of where the data came from, how information was kept out of the evaluation set, what an explanation actually explains, and which privacy choices change the model's behavior.",
      "SocialSense-SLM combines those concerns in a multimodal AutoML and retrieval application. Its documented workflows cover tabular modeling, vision training and ONNX inference, document retrieval, explanation alignment, privacy-utility sweeps, and diagnostic governance reporting.",
      "The aim is to make those checks visible alongside the application rather than burying them in a training notebook. A privacy setting or risk score is more useful when someone can inspect the process behind it and understand what it does not establish."
    ],
    callout: "A privacy control, an explanation, and a risk score answer different questions. Putting them on one dashboard should not blur those differences.",
    approachTitle: "Connect the workflows through reproducible artifacts.",
    approach: [
      "The README describes a feature-store-first workflow with versioned snapshots, a dataset registry, and scripts that connect training to reports. Individual paths handle tabular models, image privacy experiments, and text retrieval rather than forcing every modality through the same method."
    ],
    steps: [
      ["Check and version the inputs", "Leakage guardrails look for duplicate, time, and path-related issues. A feature manifest and dataset configuration provide a record of which inputs a run is meant to use."],
      ["Train models with explanations in view", "The tabular path includes LightGBM and Optuna, optional AutoML baselines, and SHAP. Explanations are part of the workflow, but feature attribution should not be confused with a causal explanation."],
      ["Measure privacy and utility together", "The vision path includes training, ONNX export, inference, and consent-aware face blur. Blur sweeps explore how a transformation changes privacy-related behavior and task utility rather than assuming one setting is universally best."],
      ["Retrieve text and inspect explanation alignment", "SBERT retrieval is documented alongside a TF-IDF fallback and optional vector indexes. ExplainAlign compares top model features with retrieved passages through an alignment diagnostic."],
      ["Surface diagnostics and monitor changes", "The application exposes feature information, governance scoring, and other workflow views. Distribution checks such as PSI and KS support monitoring, with interpretation still dependent on the data and thresholds."]
    ],
    insideTitle: "Several forms of accountability in one codebase.",
    inside: "The project combines modeling code with scripts that make its assumptions and outputs easier to examine. The interesting connection is between the prediction path and the artifacts used to question it.",
    components: [
      ["Tabular modeling and guardrails", "Leakage-aware pipelines, model search, baseline comparisons, and SHAP form the structured-data workflow.", "backend/app/services/guardrails.py + scripts/tabular/"],
      ["Vision privacy experiments", "Training, ONNX conversion, blur sweeps, and privacy-policy search expose a concrete privacy-utility investigation.", "scripts/vision/ + reports/privacy_utility/"],
      ["Retrieval and alignment", "Text embeddings, extractive retrieval, and ExplainAlign connect document context with explanation diagnostics.", "scripts/rag/build_sbert.py + scripts/explain/align_metric.py"],
      ["Reproducibility and dashboard", "Versioned feature snapshots, dataset configuration, reports, and a React dashboard connect the research workflows to an application surface.", "feature_store/manifest.json + configs/datasets/ + frontend/"]
    ],
    evidenceTitle: "Useful diagnostics are not blanket guarantees.",
    evidence: [
      "The repository identifies workflow scripts and expected reports, but it also lists unfinished work, including additional CI integration, figures, registry UI tests, and RAG performance analysis. Its demo instructions call for real datasets and model artifacts to be supplied before use.",
      "The governance score is an application diagnostic, not a legal or privacy certification. Face blur does not prove that an image is anonymous. Alignment between feature explanations and passages does not independently prove that a generated answer is correct or that hallucinations have been eliminated."
    ],
    statusTitle: "Inspectable workflows, with explicit work still to do.",
    limits: [
      "The README's TODO list is part of the project status, not something this overview treats as completed.",
      "Privacy-utility measurements depend on the transformation, dataset, threat model, and utility metric being studied.",
      "Governance and alignment scores are diagnostics whose interpretation needs supporting evaluation.",
      "A supplied dataset, model artifact, and environment are necessary to reproduce a meaningful demonstration."
    ],
    takeawayTitle: "Make the trade-off something a person can inspect.",
    takeaway: [
      "SocialSense is where several practical questions meet: can I trace the data, understand the prediction, see what a privacy choice changes, and recognize when the distribution has moved? None of those questions is answered by accuracy alone.",
      "What I want the application to encourage is inspection rather than blind trust in a dashboard number. The value is in connecting the controls and diagnostics to their underlying artifacts, while being honest about the evidence still needed."
    ],
    closing: "Trust becomes more useful when people can inspect the choices behind a prediction, not just the prediction itself.",
    resources: [
      source("SocialSense-SLM overview", github("GropAI"), "The README explains the multimodal workflows, evidence paths, dependencies, and unfinished work."),
      source("Privacy and governance workflow", github("GropAI") + "#governance--privacy", "The documented blur sweeps, policy search, risk reporting, and explanation-alignment workflow."),
      source("Monitoring and drift", github("GropAI") + "#monitoring--drift", "The README's entrypoints for distribution checks and leakage auditing.")
    ]
  },
  tradeguard: {
    displayTitle: "TradeGuard",
    subtitle: "A control panel that takes the stop button seriously.",
    kind: "Full-stack software engineering",
    stage: "Personal, paper-first trading application",
    mapTitle: "The screen is not the execution engine.",
    map: [
      ["An operator issues a command", "A private dashboard provides authenticated controls."],
      ["The worker owns execution", "Reconciliation and verifier checks sit outside the browser."],
      ["Persist the state and the stop condition", "Commands, decisions, and audit events have a durable record."]
    ],
    questionTitle: "What happens after the operator clicks a button?",
    question: [
      "An automated trading dashboard can look simple: a few charts, a start button, and a stop button. The difficult engineering is behind that surface. The browser can disconnect, a process can restart, and the broker's state can differ from the application's last view of it.",
      "TradeGuard is a personal, paper-first control application built around those concerns. It separates the dashboard and API from an independent trading worker, stores operational state in PostgreSQL, and includes a durable kill-switch design.",
      "This is a software architecture project, not a claim of profitable trading. The focus is on controlling an automated process, recording its decisions, and keeping operator intent from being reduced to a temporary state in a browser tab."
    ],
    callout: "A stop button should represent a system state, not just a change in how the dashboard looks.",
    approachTitle: "Separate control, execution, and persistence.",
    approach: [
      "The README describes a private, single-operator system. A FastAPI service handles access and control commands, while a separate worker owns broker reconciliation, strategy evaluation, verifier checks, and order submission. This page describes that architecture without connecting to a broker or executing trades."
    ],
    steps: [
      ["Authenticate the operator", "The private application includes TOTP-protected operator access. HTTPS and a trusted operator account are part of the documented operating model, not optional assumptions for a public multi-user service."],
      ["Record a control command", "The API provides dashboard data and control surfaces, backed by persistent state and audit records. The interface is not meant to own the execution loop itself."],
      ["Let the worker reconcile and evaluate", "The independent worker checks broker state, evaluates strategy logic, applies verifier checks, and owns submission. Separating it from the web process makes the responsibility explicit."],
      ["Respect durable stop and risk state", "The architecture includes a durable kill switch and portfolio-percentage risk controls. Their implementation belongs in the operational path, not only in frontend validation."],
      ["Make the process inspectable", "Persisted commands, snapshots, decisions, orders, and audit events support inspection. A React dashboard and Telegram alerts provide visibility into the system's operation."]
    ],
    insideTitle: "A small application with serious state boundaries.",
    inside: "The components are intentionally distinct. Each one has a different job, and the source repository's production runbook describes the environment and paper-first operating gates around them.",
    components: [
      ["Operator API", "FastAPI handles authentication, dashboard APIs, audit logging, and control commands for the private application.", "web-api / FastAPI"],
      ["Independent worker", "The worker owns reconciliation, strategy evaluation, verifier checks, order submission, and durable kill-switch behavior.", "trading-worker"],
      ["Persistent records", "PostgreSQL stores users, sessions, bot state, commands, risk profiles, audit events, snapshots, decisions, and orders.", "PostgreSQL"],
      ["Dashboard and delivery", "A Vite, React, and TypeScript interface provides the operator view. Caddy handles the documented HTTPS and static-serving role.", "frontend/ + Caddy + Docker Compose"]
    ],
    evidenceTitle: "Paper-first is part of the scope.",
    evidence: [
      "The repository instructs operators to keep Alpaca in paper mode and live trading disabled until its paper-first gate is satisfied. This portfolio presents the project in that paper-first scope and does not claim that the gate has passed or that a live deployment is operating.",
      "A well-structured control system cannot guarantee returns or remove market and operational risk. Authentication, reconciliation, persistence, and a kill switch are engineering controls. Their presence should not be confused with a performance claim about the underlying strategy."
    ],
    statusTitle: "Private engineering project, not a public trading service.",
    limits: [
      "No investment return, strategy performance, or profitability claim is made here.",
      "The documented model is one trusted operator, not public SaaS or a multi-tenant trading product.",
      "Paper mode and disabled live trading remain the stated starting configuration.",
      "Source documentation and a runbook describe the system; they are not evidence that its controls have been independently validated on this portfolio."
    ],
    takeawayTitle: "Reliability is what happens outside the happy path.",
    takeaway: [
      "TradeGuard represents a different side of my work: taking an application that changes state and making its responsibilities explicit. The browser shows the system, the API accepts commands, the worker acts, and the database preserves what happened.",
      "The broader lesson is useful beyond trading. Whenever software controls an automated process, stopping, restarting, reconciling, and auditing it deserve as much attention as the main feature. A polished interface should make those controls understandable without pretending the underlying complexity has disappeared."
    ],
    closing: "The interesting engineering is not only how a system starts working. It is how it stays understandable when something goes wrong.",
    resources: [
      source("TradeGuard repository", github("Trading"), "Architecture, private operating scope, paper-first defaults, and development entrypoints."),
      source("Production runbook", github("Trading", "docs/production-runbook.md"), "The project's operating instructions and gates. This portfolio does not execute any of them.")
    ]
  }
};
