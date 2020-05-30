all: update

update: 
	./rezip.sh web
	wsk -i action update /guest/sharelatex/web web.zip --kind  nodejs:10aspell --web true


