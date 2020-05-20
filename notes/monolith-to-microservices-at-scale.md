# Glossary: Monolithe to Microservice at scale

- [Glossary: Monolithe to Microservice at scale](#glossary-monolithe-to-microservice-at-scale)
  - [1. Microservices Design Principles and Best Practices](#1-microservices-design-principles-and-best-practices)
  - [2. Docker](#2-docker)
    - [Debugging](#debugging)
  - [3. Automating the application development cycle](#3-automating-the-application-development-cycle)
  - [4. K8S](#4-k8s)
    - [AWS Container ecosystem](#aws-container-ecosystem)
    - [Debugging](#debugging-1)
  - [5. Best Practices/Design Patterns for K8S in production](#5-best-practicesdesign-patterns-for-k8s-in-production)
    - [Config](#config)
    - [Production ready](#production-ready)
    - [Reverse Proxy](#reverse-proxy)
    - [Securing Microservices](#securing-microservices)
    - [Scaling and Self-healing](#scaling-and-self-healing)
      - [Self-healing](#self-healing)
      - [Horizontal Pod Autoscaler](#horizontal-pod-autoscaler)
    - [Logging](#logging)

## 1. Microservices Design Principles and Best Practices

- Draw **Dependency Graph** to list out dependencies, and then determine the best component for refactoring based on complexity and coupling.
- **Strangler Pattern**: gradually refactor a monolith application component by component.

| Term               | Definition                                                                                                             |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Dependency Graph   | A diagram that maps out the relationships between components to understand which parts of the system rely on the other |
| Fault Tolerance    | The ability to continue operating in the event of a failure                                                            |
| Module             | Program that is logically grouped together to execute a specific functionality                                         |
| REST               | Architectural style of communication across a network                                                                  |
| Strangler Pattern  | Strategy of refactoring code by incrementally replacing components of the codebase                                     |
| Technical Debt     | The concept of choosing an easier implementation of software that will need to be reworked                             |
| Vertical Scaling   | Scaling by increasing the capacity of existing machines                                                                |
| Horizontal Scaling | Scaling by adding more machines                                                                                        |

## 2. Docker

Ref: [Google: Best practices for speeding up builds](https://cloud.google.com/cloud-build/docs/speeding-up-builds)

### Debugging

Ref:

- [Live Debugging with Docker](https://www.docker.com/blog/live-debugging-docker/)
- [`docker container attach`](https://docs.docker.com/engine/reference/commandline/container_attach/)

- `docker exec -it <container> bash`
- `docker logs <container>`

| Term               | Definition                                                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base Image         | A set of common dependencies built into a Docker image that acts as a starting point to build an application’s Docker images to reduce build times |
| Container          | Grouped software dependencies and packages that make it easier and more reliable to deploy software                                                |
| Container Registry | A centralized place to store container images                                                                                                      |
| Docker-compose     | A tool used to run multiple Docker containers at once; often used to specify dependent relationships between containers                            |
| Dockerfile         | A file containing instructions on how to translate an application into an image that can be run in containers                                      |
| Ephemeral          | Software property where an application is expected to be short-lived                                                                               |
| Image              | A snapshot of dependencies and code used by Docker containers to run an application                                                                |
| System Process     | A computer program run by the operating system                                                                                                     |

## 3. Automating the application development cycle

- Code Deployment involves external dependencies: 
  - infrastructure changes (i.e. database)
  - security changes
  - permissions provisioning
  - load testing
- `CI/CD`: streamlining the process

| Term                    | Definition                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Continuous Integration  | practice of streamlining developer code to a centralized source                                                  |
| Continuous Deployment   | practice of streamlining how code is released                                                                    |
| Least Privileged Access | providing the least amount of permissions necessary                                                              |
| YAML                    | Yet another markup language a common way to programmatically write configurations. Sometimes referred to as YML. |

## 4. K8S

### AWS Container ecosystem

Three main container orchestraion players in the market before K8S dominance: `Docker Swarm`, `ECS`, `K8S`

- `ECS`: AWS own solution for container orchestration
- `EKS`: Managed K8S
- `Fargate`: AWS tool that helps streamline deploying containers to ECS and EKS.

### Debugging

- `kubectl exec -it <pod_name> bash`
- `kubectl logs <pod_name>`

| Term               | Definition                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------- |
| Horizontal Scaling | Handling increased traffic by creating additional replicas so that traffic can be divided across the replicas |
| Kubernetes Service | An abstraction of a set of pods and interface for how to interact with the pods                               |
| Pods               | A set of containers that are deployed together                                                                |
| Load Balancing     | Handling traffic by distributing it across different endpoints                                                |
| Replica            | A redundant copy of a resource often used for backups or load balancing                                       |
| Consumer           | An external entity such as a user or program that interfaces with an application                              |

## 5. Best Practices/Design Patterns for K8S in production

### Config

- `Cost`
  - Configure the resources and replicas for our deployed applications.
- `Security`
  - Configure who has access to the Kubernetes pods and services.
  - Secure traffic for least-privilege

### Production ready

- `Restrict Access`
  - Follow properties of least-privilege to secure our application.
- `Scale`
  - Be able to handle the number and size of user requests.
- `Availability`
  - Ensure that the application is responsive and able to be used when needed.

### Reverse Proxy

Act as an API Gateway: [Building Microservices: Using an API Gateway](https://www.nginx.com/blog/building-microservices-using-an-api-gateway/)

- simplify service management to have a single point of entry

### Securing Microservices

Use `Penetration testing` to test security.

- `AWS security groups`: Enables you to restrict the inbound and outbound traffic for AWS resources.
- `kubernetes Ingress and Egress`: Enables you to restrict the inbound and outbound traffic for Kubernetes resources.

### Scaling and Self-healing

#### Self-healing

Ref: [Kubernetes Health Check Best Practices](https://cloud.google.com/blog/products/gcp/kubernetes-best-practices-setting-up-health-checks-with-readiness-and-liveness-probes)

- `Health checks`
  - an HTTP endpoint that must return a 200 response for a healthy status. Kubernetes will periodically ping this endpoint.
- `Replicas`
  - Kubernetes will attempt to maintain the number of desired replicas. If a pod is terminated, it will automatically recreate the pod.

#### Horizontal Pod Autoscaler

- `kubectl autoscale deployment <NAME> --cpu-percent=<CPU_PERCENTAGE>                --min=<MIN_REPLICAS> --max=<MAX_REPLICAS>` 
- `kubectl get hpa`

### Logging

Best practices

- `timestamp`
- `consistent format`
- `PID` to track activity
- `Log rotations`
- `Stack traces`
- `Log timestamp delta`: measure performance

| Term                            | Definition                                                                                                                                           |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ingress                         | inbound web traffic                                                                                                                                  |
| Egress                          | outbound web traffic                                                                                                                                 |
| API Gateway                     | a single point of entry for groups of microservices.                                                                                                 |
| Horizontal Pod Autoscaler (HPA) | A Kubernetes deployment feature that allows additional pods to be created when a CPU usage threshold is reached.                                     |
| Liveness Probe                  | A monitoring activity that occurs at scheduled intervals to ping a health check API endpoint to validate that the application is in a healthy state. |
| Resilience                      | The property of an application to handle and recover from failures.                                                                                  |