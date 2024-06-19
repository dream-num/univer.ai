CR = 
LOCAL_TAG = dev
PUSH_TAG ?= latest
REPOSITORY = univer-site
NS ?= univer
CTR = docker
BUILDER ?= univerdocs-builder

OSARCH = linux/amd64
image_exists=$(shell docker manifest inspect $(CR)/$(NS)/$(REPOSITORY):$(IMAGE_TAG) > /dev/null 2>&1 && echo true || echo false)

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

.PHONY: check_image
# Check if the image exists
check_image:
	@echo $(image_exists)
