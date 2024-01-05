CR = univer-acr-registry.cn-shenzhen.cr.aliyuncs.com
LOCAL_TAG = dev
PUSH_TAG ?= latest
REPOSITORY = univer-docs
NS ?= univer
CTR = docker
BUILDER = univerdocs-builder

OSARCH = linux/amd64,linux/arm64/v8

.PHONY: create_builder
# Check if the builder exists and create it if not
create_builder:
	@if ! $(CTR) buildx inspect $(BUILDER) > /dev/null 2>&1; then \
		$(CTR) buildx create --name $(BUILDER) --use; \
	fi

.PHONY: push_image
# Build and Push multi-platform Docker images for univer docs
push_image: create_builder
ifeq ($(PUSH_TAG), latest)
	$(eval image_tag=-t $(CR)/$(NS)/$(REPOSITORY):latest)
else
	$(eval image_tag=-t $(CR)/$(NS)/$(REPOSITORY):$(PUSH_TAG) -t $(CR)/$(NS)/$(REPOSITORY):latest) 
endif
	$(CTR) buildx build \
	--builder $(BUILDER) \
	--platform $(OSARCH) \
	--file Dockerfile \
	$(image_tag) \
	--push .
