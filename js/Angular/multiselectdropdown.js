var aaangularjsapplication =
angular.module('aaangularjsapplication', []);


aaangularjsapplication.directive('aadropdownmultiselect', function () {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            multiselectoptions: '=',
        },
        template:
        '<div class="btn-group" ng-class={open:open}> \
            <button type="button" class="multiselect dropdown-toggle btn btn-default" title="None selected" ng-click="toggleDropdown()"> \
                <span class="multiselect-selected-text">{{model.toggleText}}</span> \
                <b class="caret"></b> \
            </button> \
            <ul class="multiselect-container dropdown-menu"> \
                <li class="multiselect-item multiselect-all"> \
                    <label style="padding: 3px 20px 3px 40px;margin-top:0px;margin-bottom:0px" class="checkbox"> \
                        <input type="checkbox" ng-model="model.selectAll" ng-change="toggleSelectAll()">Select All \
                    </label> \
                </li> \
                <li ng-repeat="option in (filteredOptions = (multiselectoptions| filter:model.query))"> \
                    <label style="padding: 3px 20px 3px 40px;margin-top:0px;margin-bottom:0px" class="checkbox"> \
                        <input type="checkbox" ng-checked="isSelected(option)" ng-model="option.selected" ng-change="toggleSelectedItem(option);">{{option.text}} \
                    </label> \
                </li> \
            </ul> \
        </div>',
        controller: function ($scope) {
            $scope.toggleDropdown = function () {
                $scope.open = !$scope.open;
            };

            $scope.toggleSelectAll = function ($event) {
                var selectAllClicked = true;
                if ($scope.model.selectAll == false) {
                    selectAllClicked = false;
                }
                $scope.doOnSelectAllClick(selectAllClicked, $scope.filteredOptions);
            };

            $scope.doOnSelectAllClick = function (selectAllClicked, optionArrayList) {
                $scope.model = [];
                if (selectAllClicked) {
                    angular.forEach(optionArrayList, function (item, index) {
                        item["Selected"] = true;
                        $scope.model.push(item);
                    });

                    if (optionArrayList.length == $scope.multiselectoptions.length)
                    {
                        $scope.model.selectAll = true;
                    }
                }
                else {
                    angular.forEach(optionArrayList, function (item, index) {
                        item["Selected"] = false;
                    });
                    $scope.model.selectAll = false;
                }
                $scope.setToggleText();
            }

            $scope.toggleSelectedItem = function (option) {
                var intIndex = -1;
                angular.forEach($scope.model, function (item, index) {
                    if (item.value == option.value) {
                        intIndex = index;
                    }
                });

                if (intIndex >= 0) {
                    $scope.model.splice(intIndex, 1);
                }
                else {
                    $scope.model.push(option);
                }

                if ($scope.model.length == $scope.multiselectoptions.length) {
                    $scope.model.selectAll = true;
                }
                else {
                    $scope.model.selectAll = false;
                }
                $scope.setToggleText();
            };

            $scope.setToggleText = function () {
                if (!($scope.model.length > 0)) {
                    $scope.model.toggleText = "None Selected";
                } else if ($scope.model.length === $scope.multiselectoptions.length) {
                    $scope.model.toggleText = "All Selected";
                } else {
                    $scope.model.toggleText = $scope.model.length + " Selected";
                }

            }

            $scope.isSelected = function (option) {
                var selected = false;
                angular.forEach($scope.model, function (item, index) {
                    if (item.value == option.value) {
                        selected = true;
                    }
                });
                option.selected = selected;
                return selected;
            }

            /**
             * Handle disabled option
             */
            $scope.isDisabled = function (option) {
                // TODO
            }
            
            /**
             * First load
             */
            var onload = function () {
                $scope.setToggleText();
            }();
        }
    }
});

