while true; do 
	curl -X PUT -d id=c001 -d response=$((RANDOM%10+0)) -d status=$((RANDOM%2)) localhost:4567/status/api/v1/checks/id/update;
	echo ""
	curl -X PUT -d id=c002 -d response=$((RANDOM%10+0)) -d status=$((RANDOM%2)) localhost:4567/status/api/v1/checks/id/update;
	echo ""
	sleep 5;
done
